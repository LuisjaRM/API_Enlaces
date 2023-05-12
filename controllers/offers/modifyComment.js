// Function Requires ↓

const { generateError } = require("../../services/generateError");
const {
  updateComment,
  getCommentsById,
  getSingleCommentOffer,
} = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

const { commentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const modifyComment = async (req, res, next) => {
  try {
    const { offerId } = req.params.id;
    const {commentId, newComment} = req.body;
      
    // Joi validation
    const schema = commentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    //Query: Get information of the offer that we want update
    const comments = await getCommentsById(offerId);
    const oldComment = await  getSingleCommentOffer(commentId);
    

    // Check if the user is creator of the offer or is an admin
    if (req.userInfo.id !== oldComment.user_id && req.userInfo.role != "admin") {
      throw generateError(
        "No estás autorizado para modificar esta oferta",
        401
      );
    }

    await updateComment(
        offerId, commentId, newComment
    );

    res.status(200).send({
      status: "ok",
      message: `El comentario con id: ${commentId} de la oferta con id: ${offerId} ha sido modificado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyComment };
