// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Queries requires ↓

const {
  getSingleOfferQuery,
  postVoteQuery,
} = require("../../database/offersQueries/-exportQueries");

// Joi require ↓

const { voteOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const postVote = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    const userId = req.userInfo.id;
    const { vote } = req.body;

    // Joi validation
    const schema = voteOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Get information of the offer that we want to vote
    await getSingleOfferQuery(offerId);

    await postVoteQuery(offerId, userId, vote);

    res.status(201).send({
      status: "ok",
      message: "Voto registrado",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postVote };
