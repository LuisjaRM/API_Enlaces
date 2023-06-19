// Queries requires ↓

const {
  getFavoritesOffersQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getFavoritesOffers = async (req, res, next) => {
  try {
    const userId = req.userInfo.id;

    // Query: get favorites offers
    const offers = await getFavoritesOffersQuery(userId);

    // Res.send
    res.status(201).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavoritesOffers };
