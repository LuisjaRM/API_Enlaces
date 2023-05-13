// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getSingleCommentOffer = async (commentId) => {
  let connection;
  try {
    const connection = await getConnection();
    const [user] = await connection.query(
      `
    SELECT user_id FROM comments
    WHERE id = ?
    `,
      [commentId]
    );

    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getSingleCommentOffer };
