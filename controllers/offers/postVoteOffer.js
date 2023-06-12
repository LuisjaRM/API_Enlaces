// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  getOfferById,
  voteOffer,
} = require("../../database/offersQueries/expOffersQueries");

// Joi require ↓

const { voteOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const postVoteOffer = async (req, res, next) => {
  try {
    const offerId = req.params.id;
    const userId = req.userInfo.id;
    const { vote } = req.body;

    // Joi validation
    const schema = voteOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Get information of the offer that we want to vote
    await getOfferById(offerId);

    await voteOffer(offerId, userId, vote);

    res.status(201).send({
      status: "ok",
      message: "Voto registrado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postVoteOffer };
