// Npm require ↓

const bcrypt = require("bcrypt");

// Functions requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const checkEmailandPassword = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
          SELECT id, role, active, user, password
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

    // If the password is correct, create object
    let info;
    if (validPassword) {
      // Check if the user is activated
      if (user[0].active === 0) {
        throw generateError("Usuario no verificado", 401);
      } else {
        info = {
          id: user[0].id,
          role: user[0].role,
          user: user[0].user,
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
