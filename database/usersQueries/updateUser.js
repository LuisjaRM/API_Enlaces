// Npm require ↓

const { v4: uuidv4 } = require("uuid");

// Functions requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");
const { sendMail } = require("../../services/sendMail");
const { savePhoto } = require("../../services/savePhoto");

// Query ↓

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

    if (email && user) {
      throw generateError(
        "No puedes modificar el email y el nombre de usuario al mismo tiempo"
      );
      // Check if email exists
    } else if (email && !user) {
      // Check is not the same that old email
      if (email !== userSelected[0].email) {
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
        throw generateError("Tu cuenta ya está registrada con este email", 409);
      }
      // Check if user exists
    } else if (user && !email) {
      // Check is not the same that old user
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
      } else {
        throw generateError(
          "Tu cuenta ya está registrada con ese nombre de usuario",
          409
        );
      }
    }

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
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateUser };
