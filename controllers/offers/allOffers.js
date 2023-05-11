// Requires Functions database ↓

const {
  getAllOffers,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const allOffers = async (req, res, next) => {
  try {
    const offers = await getAllOffers();

    res.send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { allOffers };
