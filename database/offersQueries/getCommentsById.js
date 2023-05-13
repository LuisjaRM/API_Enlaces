// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const getCommentsById = async (offerId) => {
  let connection;
  try {
    connection = await getConnection();

    const [comments] = await connection.query(
      `
        SELECT * FROM comments WHERE offer_id = ?
      `,
      [offerId]
    );

    // Check if exists comments
    if (comments.length === 0) {
      throw generateError(`No existen comentarios en esta oferta`, 404);
    }

    // Save the comments in a array
    let commentsOffer = [];
    for (let i = 0; i < comments.length; i++) {
      commentsOffer.push(
        `${comments[i].comment}. user_id: ${comments[i].user_id}. ${comments[i].dateComments}`
      );
    }

    // Return array
    return commentsOffer;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getCommentsById };
