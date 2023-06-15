// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getDayOffers = async () => {
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
        GROUP BY o.id
        ORDER BY o.created_at DESC;
        `
    );

    const [offers] = await connection.query(`
        SELECT o.*, u.user, u.avatar
        FROM offers o
        INNER JOIN users u ON o.user_id = u.id
        WHERE o.id NOT IN (SELECT offer_id FROM votes) AND o.created_at BETWEEN '${dateToday} 00:00:00' AND '${dateToday} 23:59:59'
        ORDER BY o.created_at DESC;
`);

    // Return offers
    return { offersWithVotes, offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getDayOffers };
