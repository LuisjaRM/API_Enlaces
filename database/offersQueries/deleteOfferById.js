// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const deteleOfferById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE FROM offers WHERE id = ?
        `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deteleOfferById };
