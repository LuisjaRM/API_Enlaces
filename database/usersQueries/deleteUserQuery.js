// Requires ↓

const { getConnection } = require("../connectionDB");

const deleteUserQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection(id);

    // Delete all user references in other tables

    // Delete user likes
    await connection.query(
      `
      DELETE FROM likes
      WHERE user_id = ?
      `,
      [id]
    );

    // Delete user votes
    await connection.query(
      `
      DELETE FROM votes
      WHERE user_id = ?
      `,
      [id]
    );

    // Select user comments with likes
    const [comments] = await connection.query(
      `
      SELECT c.*
      FROM comments c
      INNER JOIN likes l ON l.comment_id = c.id
      WHERE c.user_id = ?
      `,
      [id]
    );

    // Delete likes of user comments
    if (comments.length > 0) {
      for (const comment of comments) {
        await connection.query(
          `
        DELETE FROM likes
        WHERE comment_id = ?
      `,
          [comment.id]
        );
      }
    }

    // Delete user comments
    await connection.query(
      `
      DELETE FROM comments
      WHERE user_id = ?
      `,
      [id]
    );

    // Delete user favorites
    await connection.query(
      `
      DELETE FROM favorites
      WHERE user_id = ?
        `,
      [id]
    );

    // Select user offers with votes
    const [offersWithVotes] = await connection.query(
      `
        SELECT o.*
        FROM offers o
        INNER JOIN votes v ON v.offer_id = o.id
        INNER JOIN users u ON o.user_id  = u.id
        WHERE o.user_id = ?
        GROUP BY o.id;
  `,
      [id]
    );

    // Delete votes of user offers
    if (offersWithVotes.length > 0) {
      for (const offer of offersWithVotes) {
        await connection.query(
          `
          DELETE FROM votes
          WHERE offer_id = ?
          `,
          [offer.id]
        );
      }
    }

    // Select user offers
    const [userOffers] = await connection.query(
      `
        SELECT *
        FROM offers 
        WHERE user_id = ?
  `,
      [id]
    );

    // Select likes of comments of user offers
    if (userOffers.length > 0) {
      for (const offer of userOffers) {
        const [commentsWithLikes] = await connection.query(
          `
      SELECT c.*
      FROM comments c
      INNER JOIN likes l ON l.comment_id = c.id
      INNER JOIN users u ON c.user_id  = u.id
      WHERE offer_id = ?
      GROUP BY c.id;
      `,
          [offer.id]
        );

        // Delete likes of comments of user offers
        if (commentsWithLikes.length > 0) {
          for (const comment of commentsWithLikes) {
            await connection.query(
              `
            DELETE FROM likes
            WHERE comment_id = ?
          `,
              [comment.id]
            );
          }
        }

        const [userOffersComments] = await connection.query(
          `
          SELECT c.*
          FROM comments c
          WHERE offer_id = ?
      `,
          [offer.id]
        );

        for (const comment of userOffersComments) {
          await connection.query(
            `
          DELETE FROM comments
          WHERE comment_id = ?
        `,
            [comment.id]
          );
        }

        await connection.query(
          `
        DELETE FROM favorites
        WHERE offer_id = ?
      `,
          [offer.id]
        );
      }
    }

    await connection.query(
      `
        DELETE FROM offers
        WHERE user_id = ?
              `,
      [id]
    );

    // Delete user

    await connection.query(
      `
              DELETE FROM users
              WHERE id = ?
            `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteUserQuery };
