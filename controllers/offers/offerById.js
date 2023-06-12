// Function require ↓

const {
  getOfferById,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const offerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get offer by id
    const offerInfo = await getOfferById(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offerInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { offerById };
