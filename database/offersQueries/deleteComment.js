const { getConnection } = require("../connectionDB");
const { getCommentsById } = require("./getCommentsById");

const deleteComment = async (offerId, commentId) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      ` DELETE comments
         WHERE offer_id = ? AND id = ? `,
      [offerId, commentId]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteComment };
