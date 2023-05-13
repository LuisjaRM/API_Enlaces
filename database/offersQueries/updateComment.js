const { getConnection } = require("../connectionDB");

const updateComment = async (offerId, commentId, newComment) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `UPDATE comments
         SET comment = ?
         WHERE offer_id = ? AND id = ? `,
      [newComment, offerId, commentId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateComment };
