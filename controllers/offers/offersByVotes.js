// Function require ↓

const {
  orderByVotes,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offersByVotes = async (req, res, next) => {
  try {
    // Query: get all offers
    const offers = await orderByVotes();

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offersByVotes };
