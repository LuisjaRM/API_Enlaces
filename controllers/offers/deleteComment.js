// Function Requires ↓

const { generateError } = require("../../services/generateError");

// Queries Requires ↓
const {
  getSingleOfferQuery,
  getSingleCommentQuery,
  deleteCommentQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const deleteComment = async (req, res, next) => {
  try {
    const { offerId, commentId } = req.params;

    // Query: Check if exists the offer
    await getSingleOfferQuery(offerId);

    // Query: check if comment id exists in offer
    const user = await getSingleCommentQuery(commentId);

    // Check if the user is the creator of the offer or is an admin
    if (req.userInfo.id !== user.user_id && req.userInfo.role != "admin") {
      throw generateError(
        "No estás autorizado para modificar esta oferta",
        401
      );
    }

    //Query: delete comment
    await deleteCommentQuery(offerId, commentId);

    res.status(200).send({
      status: "ok",
      message: `El comentario con id: ${commentId} de la oferta con id: ${offerId} fue borrado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteComment };
