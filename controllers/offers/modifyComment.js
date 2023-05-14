// Function Requires ↓

const { generateError } = require("../../services/generateError");
const {
  getOfferById,
  getCommentsById,
  getSingleCommentOffer,
  updateComment,
} = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

const { commentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const modifyComment = async (req, res, next) => {
  try {
    const { offerId, commentId } = req.params;
    const { newComment } = req.body;

    // Joi validation
    const schema = commentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Check if exists the offer
    await getOfferById(offerId);

    //Query: Check if exists comments in the offer
    await getCommentsById(offerId);

    const oldComment = await getSingleCommentOffer(commentId);

    // Check if the user is the creator of the offer or is an admin
    if (
      req.userInfo.id !== oldComment.user_id &&
      req.userInfo.role != "admin"
    ) {
      throw generateError(
        "No estás autorizado para modificar esta oferta",
        401
      );
    }

    await updateComment(offerId, commentId, newComment);

    res.status(200).send({
      status: "ok",
      message: `El comentario con id: ${commentId} de la oferta con id: ${offerId} ha sido modificado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyComment };
