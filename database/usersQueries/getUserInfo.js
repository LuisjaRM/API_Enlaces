// Query to returns the private information of a user

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

const getUserInfo = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError("No hay ningún usuario con esa id", 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserInfo };
