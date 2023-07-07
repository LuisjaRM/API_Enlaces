// Npm require ↓

const { v4: uuidv4 } = require("uuid");

// Functions requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");
const { sendMail } = require("../../services/sendMail");
const { savePhoto } = require("../../services/savePhoto");

// Query ↓

const patchUserQuery = async ({ id, email, user, filesAvatar }) => {
  let connection;
  try {
    connection = await getConnection();

    const [userSelected] = await connection.query(
      `
            SELECT email, user
            FROM users
            WHERE id = ?
          `,
      [id]
    );

    // Check if exists a avatar
    if (filesAvatar) {
      // Save avatar
      const userAvatar = await savePhoto(filesAvatar);

      // Update avatar
      await connection.query(
        `
              UPDATE users
              SET avatar = ?
              WHERE id = ?
            `,
        [userAvatar, id]
      );
    } else if (email) {
      //  Check is not the same that old email
      if (userSelected[0].email === email) {
        throw generateError("Ya estás registrado con este email", 409);
      }

      // Check that new email is not used by other user
      const [existsEmail] = await connection.query(
        `
                  SELECT id
                  FROM users
                  WHERE email = ?
                `,
        [email]
      );

      if (existsEmail.length > 0) {
        throw generateError(
          "Ya existe un usuario registrado con ese email",
          409
        );
      }

      // Create confirmation email

      // Generate new regCode with uuidv4
      const regCode = uuidv4();

      // Write bodyMail
      const bodyMail = `
          Has cambiado tu email de Godlinks.
          Pulsa el enlace para validar el cambio: ${process.env.PUBLIC_HOST}${regCode}
          `;

      // Call function sendMail
      await sendMail(email, "Correo de verificación de Godlinks", bodyMail);

      // Update email and set active
      await connection.query(
        `
              UPDATE users
              SET email = ?, active = false, regCode = ?
              WHERE id = ?
            `,
        [email, regCode, id]
      );
    } else {
      //  Check is not the same that old username
      if (userSelected[0].user === user) {
        throw generateError("Ya estás registrado con este username", 409);
      }

      // Check that new user is not used by other user
      const [existsUser] = await connection.query(
        `
                        SELECT *
                        FROM users
                        WHERE user = ?
                      `,
        [user]
      );

      if (existsUser.length > 0) {
        throw generateError(
          "Ya existe un usuario registrado con ese nombre de usuario",
          409
        );
      }

      // Update user
      await connection.query(
        `
                UPDATE users
                SET user = ?
                WHERE id = ?
              `,
        [user, id]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchUserQuery };
