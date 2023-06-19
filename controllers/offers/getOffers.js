// Queries requires ↓

const {
  getAllOffersQuery,
  getDailyOffersQuery,
  getOffersOrderByVotesQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getOffers = async (req, res, next) => {
  try {
    const { filter } = req.query;

    let offers;

    if (filter === "all") {
      // Query: get all offers
      offers = await getAllOffersQuery();
    } else if (filter === "daily") {
      // Query: get today offers
      offers = await getDailyOffersQuery();
    } else if (filter === "by-votes") {
      // Query: get all offers
      offers = await getOffersOrderByVotesQuery();
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

module.exports = { getOffers };
