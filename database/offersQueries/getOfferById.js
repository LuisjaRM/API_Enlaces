// Require ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Function ↓

const getOfferById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [offer] = await connection.query(
      `
        SELECT * FROM offers WHERE id = ?
      `,
      [id]
    );

    if (offer.length === 0) {
      throw generateError(`No se ha encontrado ofertas de este usuario`, 404);
    }

    return offer[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getOfferById };
