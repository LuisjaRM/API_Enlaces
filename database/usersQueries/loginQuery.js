// Requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../../database/connectionDB");

// Requires npm ↓
const bcrypt = require("bcrypt");

// Functions ↓

const loginQuery = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
          SELECT id, role, password
          FROM users
          WHERE email = ?
          `,
      [email]
    );

    let validPassword = false;
    if (user.length !== 0) {
      validPassword = await bcrypt.compare(password, user[0].password);
    }

    let info;
    if (validPassword) {
      info = {
        id: user[0].id,
        role: user[0].role,
      };
    }

    return info;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { loginQuery };
