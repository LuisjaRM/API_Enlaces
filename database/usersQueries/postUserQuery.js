// Npm requires ↓

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { sendMail } = require("../../services/sendMail");

// Query ↓

const postUserQuery = async (email, password, user) => {
  let connection;
  try {
    connection = await getConnection();

    // Create confirmation email

    // Generate new regCode with uuidv4
    const regCode = uuidv4();

    // Write bodyMail
    const bodyMail = `
          Te registraste en Godlinks.
          Pulsa el enlace para activar la cuenta: ${process.env.PUBLIC_HOST}${regCode}
          `;

    // Call function sendMail
    await sendMail(email, "Correo de verificación de Godlinks", bodyMail);

    // Crypt password
    const passwordHash = await bcrypt.hash(password, 8);

    // Create a new user, but ative = false (default)
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, user, regCode) VALUES(?, ?, ?, ?)`,
      [email, passwordHash, user, regCode]
    );

    // Return ID
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  postUserQuery,
};
