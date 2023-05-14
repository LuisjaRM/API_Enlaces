// Function require ↓

const {
  getDayOffers,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const dailyOffers = async (req, res, next) => {
  try {
    // Query: get today offers
    const offers = await getDayOffers();

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { dailyOffers };
