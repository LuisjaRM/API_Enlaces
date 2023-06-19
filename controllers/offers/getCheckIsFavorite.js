// Queries requires ↓

const {
  getCheckIsFavoriteQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getCheckIsFavorite = async (req, res, next) => {
  try {
    const userId = req.userInfo.id;
    const { offerId } = req.params;

    // Query: check if the offer is favorite
    const isFavorite = await getCheckIsFavoriteQuery(userId, offerId);

    // Res.send
    res.status(201).send({
      status: "ok",
      data: isFavorite,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCheckIsFavorite };
