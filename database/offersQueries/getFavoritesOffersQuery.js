// Function require ↓

const { getConnection } = require("../connectionDB");
// const { generateError } = require("../../services/generateError");

// Query ↓

const getFavoritesOffersQuery = async (user_id) => {
  let connection;
  try {
    connection = await getConnection();

    const [favoriteOffers] = await connection.query(
      `
        SELECT offer_id
        FROM favorites
        WHERE user_id = ? AND favorite = 1;
`,
      [user_id]
    );

    let offersWithVotes = [];
    let offersWithoutVotes = [];

    for (let i = 0; i < favoriteOffers.length; i++) {
      let offer_id = favoriteOffers[i].offer_id;

      const [offersWithVotesQuery] = await connection.query(
        `
           SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
           FROM offers o
           INNER JOIN votes v ON v.offer_id = o.id
           INNER JOIN users u ON o.user_id  = u.id
           WHERE o.id = ?
           GROUP BY o.id;
         `,
        [offer_id]
      );

      offersWithVotesQuery.map((offer) => offersWithVotes.push(offer));

      if (offersWithVotesQuery.length < 1) {
        const [offersWithoutVotesQuery] = await connection.query(
          `
             SELECT o.*, u.user, u.avatar
             FROM offers o
             INNER JOIN users u ON o.user_id = u.id
             WHERE o.id = ?;
       `,
          [offer_id]
        );
        offersWithoutVotesQuery.map((offer) => offersWithoutVotes.push(offer));
      }
    }

    // Save the offers with and without votes in the array offers

    const offers = [];

    offersWithVotes.map((offer) => offers.push(offer));
    offersWithoutVotes.map((offer) => offers.push(offer));

    offers
      .sort((a, b) => {
        return b.created_at - a.created_at;
      })
      .map((offer) => {
        return offer;
      });

    offers.map((offer) => {
      offer.favorite = false;
      for (let i = 0; i < favoriteOffers.length; i++) {
        if (favoriteOffers[i].offer_id === offer.id) {
          offer.favorite = true;
        }
      }
    });

    // Return offers
    return { offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getFavoritesOffersQuery };
