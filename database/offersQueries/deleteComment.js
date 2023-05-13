// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const deleteComment = async (offerId, commentId) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      ` DELETE FROM comments
        WHERE offer_id = ? AND id = ? `,
      [offerId, commentId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteComment };
