// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getDayOffers = async () => {
  let connection;
  try {
    connection = await getConnection();

    // Generate date in format YYYY-MM-DD
    const dateToday = new Date().toISOString().slice(0, 10);

    const [offers] = await connection.query(
      `
        SELECT * 
        FROM offers 
        WHERE created_at BETWEEN '${dateToday} 00:00:00' AND '${dateToday} 23:59:59' 
        `
    );

    // Return offers
    return offers;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getDayOffers };
