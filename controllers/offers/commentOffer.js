// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  getOfferById,
  addCommentOffer,
} = require("../../database/offersQueries/expOffersQueries");

// Joi require ↓

const { newCommentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const commentOffer = async (req, res, next) => {
  try {
    const offerId = req.params.id;
    const userId = req.userInfo.id;
    const { comment } = req.body;

    // Joi validation
    const schema = newCommentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Get information of the offer that we want to comment
    await getOfferById(offerId);

    // Query: Add comment
    await addCommentOffer(offerId, userId, comment);

    res.status(200).send({
      status: "ok",
      message: "comentario registrado",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { commentOffer };
