// Function require ↓

const {
  orderOffersByVotes,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offersByVotesOrder = async (req, res, next) => {
  try {
    // Query: get all offers
    const offers = await orderOffersByVotes();

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offersByVotesOrder };
