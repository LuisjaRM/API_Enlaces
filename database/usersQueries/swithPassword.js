// Npm requires ↓

const bcrypt = require("bcrypt");

// Functions requires ↓

const { generateError } = require("../../services/generateError");
const { getConnection } = require("../connectionDB");

// Query ↓

const swithPassword = async (recoverCode, newPassword) => {
  let connection;
  try {
    connection = await getConnection();

    // Check if recoverCode is correct
    const [user] = await connection.query(
      `
          SELECT id
          FROM users
          WHERE recoverCode = ?
        `,
      [recoverCode]
    );

    if (user.length === 0) {
      throw generateError("Código de recuperación incorrecto", 401);
    }

    // Crypt newPassword
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Update password
    await connection.query(
      `
          UPDATE users
          SET password = ?, lastAuthUpdate = ?, recoverCode = NULL
          WHERE id = ?
        `,
      [newPasswordHash, new Date(), user[0].id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  swithPassword,
};
