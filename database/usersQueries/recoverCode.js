// Npm require↓

const { v4: uuidv4 } = require("uuid");

// Functions requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../../database/connectionDB");
const { sendMail } = require("../../services/sendMail");

// Query ↓

const recoverCode = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    // Check email in the database
    const [currentMail] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE email = ?
          `,
      [email]
    );

    if (currentMail.length === 0)
      throw generateError(
        "No hay ningún usuario registrado con ese email",
        404
      );

    // Create confirmation email

    // Generate recoverCode
    const recoverCode = uuidv4();

    // Write bodyMail
    const bodyMail = `
          Se ha solicitado un cambio de contraseña en GodLinks para este email.
          El código de recuperación es: ${recoverCode}

          Si usted no ha solicitado el cambio, por favor ignore este email.
          Puede hacer login con su contraseña habitual.

          Atentamente GodLinks.
          `;

    // Call function sendMail
    await sendMail(
      email,
      "Solicitud de cambio de contraseña en Godlinks",
      bodyMail
    );

    // Set recovercode in database
    await connection.query(
      `
          UPDATE users
          SET recoverCode = ?, lastAuthUpdate = ?
          WHERE email = ?
        `,
      [recoverCode, new Date(), email]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { recoverCode };
