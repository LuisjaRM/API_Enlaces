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

    if (filesAvatar) {
      // Check if exists a avatar
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
    } else {
      // Check if email or password is the same as already exists

      const sameEmail = email === userSelected[0].email ? true : false;
      const sameUser = user === userSelected[0].user ? true : false;

      if (!sameEmail && !sameUser) {
        throw generateError(
          "No puedes modificar el email y el nombre de usuario al mismo tiempo"
        );
      } else if (sameEmail && sameUser) {
        throw generateError("No se ha realizado ninguna modificación");
      } else if (!sameEmail && sameUser) {
        //  Check is not the same that old email
        if (!sameEmail) {
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
          throw generateError(
            "Tu cuenta ya está registrada con este email",
            409
          );
        }
      } else if (sameEmail && !sameUser)
        if (!sameUser) {
          //     // Check that new user is not used by other user
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
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateUser };
