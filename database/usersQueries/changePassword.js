// Npm requires ↓

const bcrypt = require("bcrypt");

// Function Requires ↓

const { getConnection } = require("../connectionDB");
const { generateError } = require("../../services/generateError");

// Query ↓

const changePassword = async (oldPassword, newPassword, id) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
             SELECT password
             FROM users
             WHERE id = ? 
               `,
      [id]
    );

    // Check oldPassword
    const validPassword = await bcrypt.compare(oldPassword, user[0].password);

    if (!validPassword) {
      throw generateError("Contraseña incorrecta", 401);
    }

    // Crypt newPassword
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Update Password
    await connection.query(
      `UPDATE users
          SET password = ?, lastAuthUpdate = ?
          WHERE id = ?
          `,
      [newPasswordHash, new Date(), id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { changePassword };
