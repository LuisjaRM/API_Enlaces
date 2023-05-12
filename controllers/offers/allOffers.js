// Function require ↓

const {
  getAllOffers,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const allOffers = async (req, res, next) => {
  try {
    // Query: get all offers
    const offers = await getAllOffers();

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { allOffers };
