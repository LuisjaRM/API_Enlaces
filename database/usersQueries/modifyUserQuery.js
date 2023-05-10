// Requires npm ↓

const { v4: uuidv4 } = require("uuid");

// Requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");
const { sendMail } = require("../../services/sendMail");
// const savePhoto = require("../../service/savePhoto");

// Functions ↓

const modifyUserQuery = async (id, email, user) => {
  let connection;
  try {
    connection = await getConnection();

    const [userSelected] = await connect.query(
      `
            SELECT email, user
            FROM users
            WHERE id = ?
          `,
      [id]
    );

    // Check if email exists and is not the same that old email
    if (email && email !== userSelected[0].email) {
      // Check that new email is not used by other user
      const [existsEmail] = await connect.query(
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

      // Confirmation email

      // Generate new regCode with uuidv4
      const regCode = uuidv4();

      // Write bodyMail
      const bodyMail = `
          Has cambiado tu email de Godlinks.
          Pulsa el enlace para confirmar el cambio: ${process.env.PUBLIC_HOST}${regCode}
          `;

      // Call function sendMail
      await sendMail(email, "Correo de verificación de Godlinks", bodyMail);

      // Update email
      await connect.query(
        `
              UPDATE users
              SET email = ?, lastAuthUpdate = ?
              WHERE id = ?
            `,
        [email, new Date()]
      );
    }

    // Check if user exists and is not the same that old user
    if (user && user !== userSelected[0].user) {
      // Check that new user is not used by other user
      const [existsUser] = await connect.query(
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
      await connect.query(
        `
              UPDATE users
              SET user = ?, lastAuthUpdate = ?
              WHERE id = ?
            `,
        [user, new Date()]
      );
    }

    //update
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { modifyUserQuery };
