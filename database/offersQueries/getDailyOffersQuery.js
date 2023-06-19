// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getDailyOffersQuery = async () => {
  let connection;
  try {
    connection = await getConnection();

    // Generate date in format YYYY-MM-DD
    const dateToday = new Date().toISOString().slice(0, 10);

    const [offersWithVotes] = await connection.query(
      `
        SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
        FROM offers o
        INNER JOIN votes v ON v.offer_id = o.id
        INNER JOIN users u ON o.user_id = u.id
        WHERE o.created_at BETWEEN '${dateToday} 00:00:00' AND '${dateToday} 23:59:59' 
        GROUP BY o.id;
        `
    );

    const [offersWithoutVotes] = await connection.query(`
        SELECT o.*, u.user, u.avatar
        FROM offers o
        INNER JOIN users u ON o.user_id = u.id
        WHERE o.id NOT IN (SELECT offer_id FROM votes) AND o.created_at BETWEEN '${dateToday} 00:00:00' AND '${dateToday} 23:59:59';
`);

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

    // Return offers
    return { offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getDailyOffersQuery };
