// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../connectionDB");

// Controller ↓

const postCommentOffer = async (offerId, userId, comment) => {
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

    // Insert comment
    await connection.query(
      `
            INSERT INTO comments (comment, user_id, offer_id, dateComments)
            VALUES (?, ?, ?, ?)
          `,
      [comment, userId, offerId, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { postCommentOffer };
