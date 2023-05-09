// Requires npm ↓

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// Requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");
const { sendMail } = require("../../services/sendMail");

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
    } // Posible Middleware

    // Confirmation email

    // Generate new regCode with uuidv4
    const regCode = uuidv4();

    // Write bodyMail
    const bodyMail = `
          Te registraste en Godlinks.
          Pulsa el enlace para activar la cuenta: ${process.env.PUBLIC_HOST}${regCode}
          `;

    // Call function sendMail
    sendMail(email, "Correo de verificación de Godlinks", bodyMail);

    // Crypt password
    const passwordHash = await bcrypt.hash(password, 8);

    // Create a new user
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, user, regCode) VALUES(?, ?, ?, ?)`,
      [email, passwordHash, user, regCode]
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
