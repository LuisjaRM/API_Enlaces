// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const postOfferQuery = async (
  id,
  url,
  title,
  descrip,
  price,
  offer_price,
  plataform,
  offer_expiry
) => {
  let connection;

  try {
    const connection = await getConnection();

    // Insert data
    const [offer] = await connection.query(
      `INSERT INTO offers (user_id, url, title, descrip, price, offer_price, plataform, offer_expiry )
       VALUES(?, ?, ?, ?, ?, ?, ?, DATE ?)`,
      [id, url, title, descrip, price, offer_price, plataform, offer_expiry]
    );

    // Return ID
    return offer.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { postOfferQuery };
