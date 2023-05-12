// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const getCommentsById = async (offerId) => {
  let connection;
  try {
    connection = await getConnection();

    const [comments] = await connection.query(
      `
        SELECT * FROM comments WHERE offer_id = ?
      `,
      [offerId]
    );

    if (comments.length === 0) {
      throw generateError(`No existen comentarios en esta oferta`, 404);
    }

    return comments;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getCommentsById };
