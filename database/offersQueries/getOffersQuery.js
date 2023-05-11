const { getConnection } = require("../connectionDB");

const getAllOffers = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
        SELECT * FROM offers ORDER BY created_at DESC
      `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getAllOffers };
