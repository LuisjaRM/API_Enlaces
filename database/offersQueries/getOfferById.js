// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const getOfferById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    let offerInfo;

    [offerWithVotes] = await connection.query(
      `
      SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
      FROM offers o
      INNER JOIN votes v ON v.offer_id = o.id
      INNER JOIN users u ON o.user_id  = u.id
      WHERE o.id = ?
      GROUP BY o.id;
      `,
      [id]
    );

    if (offerWithVotes.length < 1) {
      const [offerWithoutVotes] = await connection.query(
        `
        SELECT o.*, u.user, u.avatar
        FROM offers o
        INNER JOIN users u ON o.user_id = u.id
        WHERE o.id = ?;
        `,
        [id]
      );

      offerInfo = offerWithoutVotes[0];

      if (offerWithoutVotes.length === 0) {
        throw generateError(
          `No se ha encontrado una oferta con el id : ${id}`,
          404
        );
      }
    } else {
      offerInfo = offerWithVotes[0];
    }

    // Get offer comments

    console.log(id);

    const [commentsWithLikes] = await connection.query(
      `
      SELECT c.*, u.user, u.avatar, SUM(l.like_) AS addLikes 
      FROM comments c
      INNER JOIN likes l ON l.comment_id = c.id
      INNER JOIN users u ON c.user_id  = u.id
      WHERE offer_id = ?
      GROUP BY c.id;
      `,
      [id]
    );

    const [commentsWithoutLikes] = await connection.query(
      `
        SELECT c.*, u.user, u.avatar
        FROM comments c
        INNER JOIN users u ON c.user_id  = u.id
        WHERE offer_id = ? AND c.id NOT IN (SELECT comment_id FROM likes);
  `,
      [id]
    );

    const comments = [];

    console.log(commentsWithLikes);

    commentsWithLikes.map((comment) => comments.push(comment));
    commentsWithoutLikes.map((comment) => comments.push(comment));

    comments
      .sort((a, b) => {
        return b.created_at - a.created_at;
      })
      .map((comment) => {
        return comment;
      });

    // Return info and comments
    return { offerInfo, comments };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getOfferById };
