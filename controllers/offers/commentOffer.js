// Functions requires ↓

const {
  postCommentOffer,
} = require("../../database/offersQueries/expOffersQueries");

// Joi require ↓

const { commentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const commentOffer = async (req, res, next) => {
  try {
    const offerId = req.params.id;
    const userId = req.userInfo.id;
    const { comment } = req.body;

    // Joi validation
    const schema = commentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    await postCommentOffer(offerId, userId, comment);

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
