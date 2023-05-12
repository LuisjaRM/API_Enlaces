const { getConnection } = require("../connectionDB");

const modifyOfferQuery = async (
  id,
  place,
  description,
  url,
  title,
  descrip,
  price,
  offer_price,
  platform,
  offer_expiry
) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `UPDATE entries SET place=?, description=? WHERE id=?`,
      [place, description, id]
    );

    connect.release();
  } finally  {
    if (connection) connection.release()
  }
};

module.exports = { modifyOfferQuery };
