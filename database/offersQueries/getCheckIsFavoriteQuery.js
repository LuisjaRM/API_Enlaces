// Function require ↓

const { getConnection } = require("../connectionDB");

// Query ↓

const getCheckIsFavoriteQuery = async (user_id, offer_id) => {
  let connection;
  try {
    connection = await getConnection();

    const [favoriteOffer] = await connection.query(
      `
        SELECT favorite
        FROM favorites
        WHERE user_id = ? AND offer_id = ?;
`,
      [user_id, offer_id]
    );

    const isFavorite = favoriteOffer[0].favorite;

    // Return offers
    return { isFavorite };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getCheckIsFavoriteQuery };
