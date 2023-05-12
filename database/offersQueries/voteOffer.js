// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../connectionDB");

// Controller ↓

const voteOffer = async (offerId, userId, vote) => {
  let connection;
  try {
    connection = await getConnection();

    // Check the user_id of the offer
    const [offer] = await connection.query(
      `
      SELECT user_id
      FROM offers
      WHERE id = ?
    `,
      [offerId]
    );

    if (offer.length === 0) {
      throw generateError("No existe una oferta con esa id", 409);
    }

    // User cannot vote for their own offer
    if (offer[0].user_id === userId) {
      throw generateError("No puedes votar tu propia oferta", 403);
    }

    // Check if the user has already voted this offer
    const [existsVote] = await connection.query(
      `
        SELECT id
        FROM votes
        WHERE user_id = ? AND offer_id = ?
      `,
      [userId, offerId]
    );

    // User cannot vote the same offer multiple times
    if (existsVote.length > 0) {
      throw generateError("Ya votaste esta oferta", 403);
    } else {
      // Insert vote
      await connection.query(
        `
            INSERT INTO votes (vote, user_id, offer_id)
            VALUES (?,?,?)
          `,
        [vote, userId, offerId]
      );

      // Calculate the average of votes of the offer
      const [avg] = await connection.query(
        `
            SELECT AVG(vote) AS avgVotes
            FROM votes v
            INNER JOIN offers o ON (v.offer_id = o.id)
            WHERE o.id = ?
          `,
        [offerId]
      );

      // Return avg
      return avg[0].avgVotes;
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { voteOffer };
