const { getConnection } = require("../connectionDB");

const patchCommentQuery = async (commentId, newComment) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `UPDATE comments
         SET comment = ?
         WHERE id = ? `,
      [newComment, commentId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchCommentQuery };
