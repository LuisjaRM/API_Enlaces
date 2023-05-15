// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../connectionDB");

// Controller ↓

const likeComment = async (commentId, userId, like) => {
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

    // Check if the user has already liked this comment
    const [existsLike] = await connection.query(
      `
        SELECT *
        FROM likes
        WHERE user_id = ? AND comment_id = ?
      `,
      [userId, commentId]
    );

    // User cannot vote the same offer multiple times
    if (existsLike.length > 0) {
      throw generateError("Ya diste like a este comentario", 403);
    } else {
      // Insert vote
      await connection.query(
        `
            INSERT INTO likes (like_, user_id, comment_id)
            VALUES (?, ?, ?)
          `,
        [like, userId, commentId]
      );

      // Calculate the add of likes of the comment
      const [add] = await connection.query(
        `
            SELECT sum(like_) AS addLikes
            FROM likes 
            WHERE comment_id = ?
          `,
        [commentId]
      );

      // Save add of likes
      const addLikes = add[0].addLikes;

      // Update AvgVotes in offers
      await connection.query(
        `
        UPDATE comments
        SET addLikes = ?
        WHERE id = ?
        `,
        [addLikes, commentId]
      );

      // Return addLikes
      return addLikes;
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { likeComment };
