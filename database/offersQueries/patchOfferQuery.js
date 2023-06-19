const { getConnection } = require("../connectionDB");

const patchOfferQuery = async (
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
    connection = await getConnection();

    const params = {
      id: id,
      url: url,
      title: title,
      descrip: descrip,
      price: price,
      offer_price: offer_price,
      plataform: plataform,
      offer_expiry: offer_expiry,
    };

    for (let i = 0; i < Object.keys(params).length; i++) {
      const key = Object.keys(params)[i];
      const data = params[key];

      if (data !== undefined) {
        await connection.query(
          `UPDATE offers
           SET ${key} = ?
           WHERE id = ?`,
          [data, id]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchOfferQuery };
