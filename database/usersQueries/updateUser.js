// Requires npm ↓

const { v4: uuidv4 } = require("uuid");

// Requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");
const { sendMail } = require("../../services/sendMail");
const { savePhoto } = require("../../services/savePhoto");

// Functions ↓

const updateUser = async (id, email, user, filesAvatar) => {
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

    // Check if email exists and is not the same that old email
    if (email) {
      if (email !== userSelected[0].email) {
        // Check that new email is not used by other user
        const [existsEmail] = await connection.query(
          `
                    SELECT *
                    FROM users
                    WHERE email = ?
                  `,
          [email]
        );

        if (existsEmail.length > 0) {
          return generateError("Ya existe un usuario con ese email", 409);
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
        throw generateError("Tu cuenta ya está registrada con este email", 409);
      }
    }

    // Check if user exists and is not the same that old user
    if (user) {
      if (user !== userSelected[0].user) {
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
          return generateError(
            "Ya existe un usuario con ese nombre de usuario",
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
      } else {
        throw generateError(
          "Tu cuenta ya está registrada con ese user name",
          409
        );
      }
    }

    // Check if exists a avatar in body
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
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateUser };
