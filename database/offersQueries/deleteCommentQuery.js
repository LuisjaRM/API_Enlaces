// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const deleteCommentQuery = async (commentId) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      ` DELETE FROM likes
        WHERE comment_id = ?`,
      [commentId]
    );

    await connection.query(
      ` DELETE FROM comments
        WHERE id = ? `,
      [commentId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteCommentQuery };
