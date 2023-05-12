// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../../database/connectionDB");

// Functions ↓

const activateUser = async (regCode) => {
  let connection;
  try {
    connection = await getConnection();

    // Check that user exists with that regCode
    const [user] = await connection.query(
      `
            SELECT id
            FROM users
            WHERE regCode = ?
            `,
      [regCode]
    );

    if (user.length === 0)
      throw generateError("No existe ningún usuario con ese código", 404);

    // Active user and delete regCode
    await connection.query(
      `
            UPDATE users
            SET active = true, regCode = NULL
            WHERE regCode = ?
            `,
      [regCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { activateUser };
