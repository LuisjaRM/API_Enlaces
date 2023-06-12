// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const orderByVotes = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [offersWithVotes] = await connection.query(
      `
        SELECT o.*, AVG(v.vote) AS avgVotes
        FROM offers o
        INNER JOIN votes v ON o.id = v.offer_id
        GROUP BY o.id
        ORDER BY avgVotes DESC
      `
    );

    const [offers] = await connection.query(`
        SELECT *
        FROM offers 
        WHERE id NOT IN (SELECT offer_id FROM votes);
`);

    return { offersWithVotes, offers };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { orderByVotes };
