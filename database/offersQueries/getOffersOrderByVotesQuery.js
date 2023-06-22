// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getOffersOrderByVotesQuery = async (isLogin, user_id) => {
  let connection;
  try {
    connection = await getConnection();

    if (isLogin) {
      const [offersWithVotes] = await connection.query(
        `
        SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
        FROM offers o
        INNER JOIN votes v ON o.id = v.offer_id
        INNER JOIN users u ON o.user_id  = u.id
        GROUP BY o.id;
      `
      );

      const [offersWithoutVotes] = await connection.query(`
        SELECT o.*, u.user, u.avatar
        FROM offers o
        INNER JOIN users u ON o.user_id = u.id
        WHERE o.id NOT IN (SELECT offer_id FROM votes);
`);

      const [favoriteOffer] = await connection.query(
        `
        SELECT offer_id
        FROM favorites
        WHERE user_id = ? AND favorite = 1;
`,
        [user_id]
      );

      // Save the offers with and without votes in the array offers

      const offers = [];

      offersWithVotes.map((offer) => offers.push(offer));
      offersWithoutVotes.map((offer) => offers.push(offer));

      offers
        .sort((a, b) => {
          return b.avgVotes - a.avgVotes;
        })
        .map((offer) => {
          return offer;
        });

      offers.map((offer) => {
        offer.favorite = false;
        for (let i = 0; i < favoriteOffer.length; i++) {
          if (favoriteOffer[i].offer_id === offer.id) {
            offer.favorite = true;
          }
        }
      });

      return { offers };
    } else {
      const [offersWithVotes] = await connection.query(
        `
          SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
          FROM offers o
          INNER JOIN votes v ON o.id = v.offer_id
          INNER JOIN users u ON o.user_id  = u.id
          GROUP BY o.id;
        `
      );

      const [offersWithoutVotes] = await connection.query(`
          SELECT o.*, u.user, u.avatar
          FROM offers o
          INNER JOIN users u ON o.user_id = u.id
          WHERE o.id NOT IN (SELECT offer_id FROM votes);
  `);

      // Save the offers with and without votes in the array offers

      const offers = [];

      offersWithVotes.map((offer) => offers.push(offer));
      offersWithoutVotes.map((offer) => offers.push(offer));

      offers
        .sort((a, b) => {
          return b.avgVotes - a.avgVotes;
        })
        .map((offer) => {
          return offer;
        });

      return { offers };
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getOffersOrderByVotesQuery };
