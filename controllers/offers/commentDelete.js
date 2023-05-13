// Function Requires ↓

const { generateError } = require("../../services/generateError");
const {
  getOfferById,
  getCommentsById,
  getSingleCommentOffer,
  deleteComment,
} = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

const { commentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const commentDelete = async (req, res, next) => {
  try {
    const {offerId,commentId} = req.params;

    // Query: Check if exists the offer
    await getOfferById(offerId);

    // Query: Check if exists comments

   await getCommentsById (offerId)

   //Query: check if comment id exists in offer

   const user= await getSingleCommentOffer (commentId)

  // Check if the user is the creator of the offer or is an admin
  if (
    req.userInfo.id !== user.user_id &&
    req.userInfo.role != "admin"
  ) {
    throw generateError(
      "No estás autorizado para modificar esta oferta",
      401
    );
  }

    //Query: delete comment

    await deleteComment (offerId, commentId);

    res.status(200).send({
      status: "ok",
      message: `El comentario con id: ${commentId} de la oferta con id: ${offerId} ha sido borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { commentDelete };