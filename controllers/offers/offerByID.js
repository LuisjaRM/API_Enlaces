// Requires Functions database ↓

const {
  getOfferByID,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offerByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offerID = await getOfferByID(id);

    res.send({
      status: "ok",
      message: offerID,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offerByID };
