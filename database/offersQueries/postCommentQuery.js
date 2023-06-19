// Requires ↓

const { getConnection } = require("../connectionDB");

// Controller ↓

const postCommentQuery = async (offerId, userId, comment) => {
  let connection;
  try {
    connection = await getConnection();

    // Insert comment
    const [newComment] = await connection.query(
      `
            INSERT INTO comments (comment, user_id, offer_id)
            VALUES (?, ?, ?)
          `,
      [comment, userId, offerId]
    );

    const newCommentId = newComment.insertId;

    // Get offer comments
    const [comments] = await connection.query(
      `
          SELECT * FROM comments WHERE offer_id = ?;
          `,
      [offerId]
    );

    return { newCommentId, comments };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { postCommentQuery };
