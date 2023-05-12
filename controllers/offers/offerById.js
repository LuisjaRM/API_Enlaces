// Function require ↓

const {
  getOfferById,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get offer by id
    const offerID = await getOfferById(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: offerID,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offerById };
