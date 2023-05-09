// Requires ↓

const { getConnection } = require("../database/connectionDB");
const { generateError } = require("../services/generateError");

// Functions ↓

const userExists = async (req, res, next) => {
  let connection;
  try {
    const { email } = req.body;

    connection = await getConnection();

    // Check that no other user exists with that mail
    const [userExists] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (userExists.length > 0) {
      throw generateError(
        "Ya existe un usuario registrado con ese email.",
        409
      );
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
