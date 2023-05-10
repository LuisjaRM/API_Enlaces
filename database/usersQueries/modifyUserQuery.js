// Requires npm ↓

// Requires ↓

const { getConnection } = require("../../database/connectionDB");
const { generateError } = require("../../services/generateError");

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
    }

    // SendEmail y validate
    //update
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { modifyUserQuery };
