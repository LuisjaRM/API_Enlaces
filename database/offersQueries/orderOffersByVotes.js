// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const orderOffersByVotes = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT * FROM offers 
        ORDER BY avgVotes DESC
      `
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { orderOffersByVotes };
