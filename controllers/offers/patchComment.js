// Function Requires ↓

const { generateError } = require("../../services/generateError");

// Queries requires ↓

const {
  getSingleCommentQuery,
  patchCommentQuery,
} = require("../../database/offersQueries/-exportQueries");

// Jois Requires ↓

const { commentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const patchComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { newComment } = req.body;

    // Joi validation
    const schema = commentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      if (
        validation.error.message ===
        `"newComment" length must be less than or equal to 280 characters long`
      )
        throw generateError(
          "El comentario no puede superar los 280 carácteres",
          401
        );
    }

    // Query: check if comment id exists in offer
    const oldComment = await getSingleCommentQuery(commentId);

    // Check if the user is the creator of the offer or is an admin
    if (
      req.userInfo.id !== oldComment.user_id &&
      req.userInfo.role != "admin"
    ) {
      throw generateError(
        "No estás autorizado para modificar este comentario",
        401
      );
    }

    await patchCommentQuery(commentId, newComment);

    res.status(201).send({
      status: "ok",
      message: `El comentario con id: ${commentId} fue modificado con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchComment };
