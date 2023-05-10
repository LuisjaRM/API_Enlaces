// Requires npm ↓

const bcrypt = require("bcrypt");

// Requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");

// Functions ↓

const checkEmailandPassword = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
          SELECT id, role, active, password
          FROM users
          WHERE email = ?
          `,
      [email]
    );

    // If the email is correct, check password
    let validPassword = false;
    if (user.length !== 0) {
      validPassword = await bcrypt.compare(password, user[0].password);
    }

    // If the password is correct, create object in info
    let info;
    if (validPassword) {
      if (user[0].active === 0) {
        throw generateError("Usuario no verificado", 401);
      } else {
        info = {
          id: user[0].id,
          role: user[0].role,
        };
      }
    }

    // Return info
    return info;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { checkEmailandPassword };