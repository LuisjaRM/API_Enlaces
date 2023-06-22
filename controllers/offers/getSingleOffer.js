// Querie require ↓

const {
  getSingleOfferQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const getSingleOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.id;

    // Query: get offer by id
    const offerInfo = await getSingleOfferQuery(id, userId);

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
