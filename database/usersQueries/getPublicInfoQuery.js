// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

const getPublicInfoQuery = async (id, user_id) => {
  let connection;

  try {
    connection = await getConnection();

    const [userInfo] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?
      `,
      [id]
    );

    if (userInfo.length === 0) {
      throw generateError("No hay ningún usuario con esa id", 404);
    }

    const [offersWithVotes] = await connection.query(
      `
    SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
    FROM offers o
    INNER JOIN votes v ON v.offer_id = o.id
    INNER JOIN users u ON o.user_id  = u.id
    WHERE o.user_id = ?
    GROUP BY o.id;
  `,
      [id]
    );

    const [offersWithoutVotes] = await connection.query(
      `
    SELECT o.*, u.user, u.avatar
    FROM offers o
    INNER JOIN users u ON o.user_id = u.id
    WHERE o.user_id = ? AND o.id  NOT IN (SELECT offer_id FROM votes);
`,
      [id]
    );

    const [favoriteOffer] = await connection.query(
      `
      SELECT offer_id
      FROM favorites
      WHERE user_id = ? AND favorite = 1;
`,
      [user_id]
    );

    // Save the offers with and without votes in the array offers

    const offers = [];

    offersWithVotes.map((offer) => offers.push(offer));
    offersWithoutVotes.map((offer) => offers.push(offer));

    offers
      .sort((a, b) => {
        return b.created_at - a.created_at;
      })
      .map((offer) => {
        return offer;
      });

    offers.map((offer) => {
      offer.favorite = false;
      for (let i = 0; i < favoriteOffer.length; i++) {
        if (favoriteOffer[i].offer_id === offer.id) {
          offer.favorite = true;
        }
      }
    });

    return { userInfo, offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getPublicInfoQuery };
