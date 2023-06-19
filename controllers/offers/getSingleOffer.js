// Querie require ↓

const {
  getSingleOfferQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getSingleOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query: get offer by id
    const offerInfo = await getSingleOfferQuery(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      data: offerInfo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSingleOffer };
