// Requires ↓

const { getConnection } = require("../database/connectionDB");
const { generateError } = require("../services/helpers");
const bcrypt = require("bcrypt");

// Functions ↓

const createNewUser = async (email, password, user) => {
  let connection;
  try {
    connection = await getConnection();

    // Check that no other user exists with that mail
    const [userExists] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (userExists.length > 0) {
      throw generateError(
        "Ya existe un usuario registrado con ese email.",
        409
      );
    }

    // Crypt password
    const passwordHash = await bcrypt.hash(password, 8);

    // Create a new user
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, user) VALUES(?, ?, ?)`,
      [email, passwordHash, user]
    );

    // Return user
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

// Exports ↓

module.exports = {
  createNewUser,
};
