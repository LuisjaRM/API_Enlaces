// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../../database/connectionDB");

// Functions ↓

const validateUserQuery = async (regCode) => {
  let connection;
  try {
    const connect = await getConnection();

    // Check that user exists with that regCode
    const [user] = await connect.query(
      `
            SELECT id
            FROM users
            WHERE regCode=?
            `,
      [regCode]
    );

    if (user.length === 0)
      return generateError("Ningún usuario con ese código", 404);

    // Active user and delete regCode
    await connect.query(
      `
            UPDATE users
            SET active=true, regCode=NULL
            WHERE regCode = ?
            `,
      [regCode]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { validateUserQuery };
