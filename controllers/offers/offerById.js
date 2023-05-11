// Requires Functions database ↓

const {
  getOfferById,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const offerID = await getOfferById(id);

    res.send({
      status: "ok",
      message: offerID,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offerById };
