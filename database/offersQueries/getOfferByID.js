// Require ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Function ↓

const getOfferByID = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT * FROM offers WHERE id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`No se ha encontrado ofertas de este usuario`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getOfferByID };
