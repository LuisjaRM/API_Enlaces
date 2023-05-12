// Functions requires ↓

const { getConnection } = require("../database/connectionDB");
const { generateError } = require("../services/generateError");

// Middleware ↓

const offerUrlRepeat = async (req, res, next) => {
  let connection;
  try {
    const { url } = req.body;
    const { id } = req.userInfo;

    connection = await getConnection();

    // Check that the user with this id dont post other offer whit the same url
    const [urlRepeat] = await connection.query(
      `SELECT id FROM offers WHERE url = ? AND user_id = ?`,
      [url, id]
    );

    if (urlRepeat.length > 0) {
      throw generateError(
        "Este usuario ya tiene publicada una oferta del mismo enlace",
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

module.exports = offerUrlRepeat;
