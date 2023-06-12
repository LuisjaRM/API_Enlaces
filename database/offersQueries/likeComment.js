// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../connectionDB");

// Controller ↓

const likeComment = async (commentId, userId) => {
  let connection;
  try {
    connection = await getConnection();

    // Check the user_id of the comment
    const [comment] = await connection.query(
      `
      SELECT *
      FROM comments
      WHERE id = ?
    `,
      [commentId]
    );

    if (comment.length === 0) {
      throw generateError("No existe una comentario con ese id", 409);
    }

    try {
      // Check if the user has already liked this comment
      const [likeInfo] = await connection.query(
        `
          SELECT like_
          FROM likes
          WHERE user_id = ? AND comment_id = ?
        `,
        [userId, commentId]
      );

      const like = likeInfo[0].like_;

      if (like === 0) {
        // Update like
        await connection.query(
          `
            UPDATE likes
            SET like_ = true
            WHERE user_id = ? AND comment_id = ?
          `,
          [userId, commentId]
        );
      } else if (like === 1) {
        // Update like
        await connection.query(
          `
                UPDATE likes
                SET like_ = false
                WHERE user_id = ? AND comment_id = ?
              `,
          [userId, commentId]
        );
      }
    } catch {
      // Insert like
      await connection.query(
        `
        INSERT INTO likes (user_id, comment_id)
        VALUES (?, ?)
      `,
        [userId, commentId]
      );
    }

    // Calculate the add of likes of the comment
    const [add] = await connection.query(
      `
            SELECT SUM(like_) AS addLikes
            FROM likes
            WHERE comment_id = ?
          `,
      [commentId]
    );

    // Save add of likes
    const addLikes = add[0].addLikes;

    // Check if user give like or dislike
    const [likeInfo] = await connection.query(
      `
        SELECT like_
        FROM likes
        WHERE user_id = ? AND comment_id = ?
      `,
      [userId, commentId]
    );

    const like = likeInfo[0].like_ === 1 ? "like" : "dislike";

    return { addLikes, like };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeComment };
