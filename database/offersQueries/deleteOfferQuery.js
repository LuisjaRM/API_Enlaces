// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const deleteOfferQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    // Delete all user references in other tables

    const [comments] = await connection.query(
      `
          SELECT c.*
          FROM comments c
          INNER JOIN likes l ON l.comment_id = c.id
          WHERE offer_id = ?
          `,
      [id]
    );

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

    await connection.query(
      `
      DELETE FROM comments
      WHERE offer_id = ?
      `,
      [id]
    );

    await connection.query(
      `
      DELETE FROM votes
      WHERE offer_id = ?
      `,
      [id]
    );

    await connection.query(
      `
      DELETE FROM favorites
      WHERE offer_id = ?
      `,
      [id]
    );

    await connection.query(
      `
        DELETE FROM offers
        WHERE id = ?
        `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteOfferQuery };
