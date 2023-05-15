// Requires ↓

const { getConnection } = require("../connectionDB");

// Controller ↓

const addCommentOffer = async (offerId, userId, comment) => {
  let connection;
  try {
    connection = await getConnection();

    // Insert comment
    const [newComment] = await connection.query(
      `
            INSERT INTO comments (comment, user_id, offer_id, dateComments)
            VALUES (?, ?, ?, ?)
          `,
      [comment, userId, offerId, new Date()]
    );

    return newComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { addCommentOffer };
