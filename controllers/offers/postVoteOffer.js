// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const { voteOffer } = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

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
      return generateError(validation.error.message, 401);
    }

    const avg = await voteOffer(offerId, userId, vote);

    res.status(200).send({
      status: "ok",
      message: "Voto registrado",
      data: { mediaVotos: avg },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postVoteOffer };
