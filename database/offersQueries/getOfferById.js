// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const getOfferById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    // Get offer info
    const [offer] = await connection.query(
      `
        SELECT * FROM offers WHERE id = ?
      `,
      [id]
    );

    const offerInfo = offer[0];

    if (offer.length === 0) {
      throw generateError(
        `No se ha encontrado una oferta con el id : ${id}`,
        404
      );
    }

    const [comments] = await connection.query(`
      SELECT *
      FROM comments 
      WHERE id NOT IN (SELECT comment_id FROM likes);
`);

    // Get offer comments
    const [commentsWithLikes] = await connection.query(
      `
      SELECT c.*, SUM(l.like_) AS addLikes 
      FROM comments c
      INNER JOIN likes l ON l.comment_id = c.id
      WHERE offer_id = ?
      GROUP BY c.id;
      `,
      [id]
    );

    // Return info and comments
    return { offerInfo, comments, commentsWithLikes };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getOfferById };
