// Function require ↓

const {
  getAllOffers,
  getDayOffers,
  orderByVotes,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const filterOffers = async (req, res, next) => {
  try {
    const { filter } = req.query;

    let offers;

    if (filter === "all") {
      // Query: get all offers
      offers = await getAllOffers();
    } else if (filter === "daily") {
      // Query: get today offers
      offers = await getDayOffers();
    } else if (filter === "by-votes") {
      // Query: get all offers
      offers = await orderByVotes();
    }

    // Res.send
    res.status(201).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { filterOffers };
