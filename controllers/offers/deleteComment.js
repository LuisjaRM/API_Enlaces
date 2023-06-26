// Function Requires ↓

const { generateError } = require("../../services/generateError");

// Queries Requires ↓
const {
  getSingleCommentQuery,
  deleteCommentQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    // Query: check if comment id exists in offer
    const user = await getSingleCommentQuery(commentId);

    // Check if the user is the creator of the comment or is an admin
    if (req.userInfo.id !== user.user_id && req.userInfo.role != "admin") {
      throw generateError(
        "No estás autorizado para borrar este comentario",
        401
      );
    }

    //Query: delete comment
    await deleteCommentQuery(commentId);

    res.status(200).send({
      status: "ok",
      message: `El comentario con id: ${commentId} fue borrado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteComment };
