// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const orderByVotes = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [offersWithVotes] = await connection.query(
      `
        SELECT o.*, u.user, u.avatar, AVG(v.vote) AS avgVotes
        FROM offers o
        INNER JOIN votes v ON o.id = v.offer_id
        INNER JOIN users u ON o.user_id  = u.id
        GROUP BY o.id
        ORDER BY avgVotes DESC
      `
    );

    const [offers] = await connection.query(`
      SELECT o.*, u.user, u.avatar
      FROM offers o
      INNER JOIN users u ON o.user_id = u.id
      WHERE o.id NOT IN (SELECT offer_id FROM votes);
`);

    return { offersWithVotes, offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { orderByVotes };
