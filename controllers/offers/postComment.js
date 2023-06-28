// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Queries requires ↓

const {
  getSingleOfferQuery,
  postCommentQuery,
} = require("../../database/offersQueries/-exportQueries");

// Joi require ↓

const { newCommentOfferJoi } = require("../../jois/offerSchemas");

// Controller ↓

const postComment = async (req, res, next) => {
  try {
    const { offerId } = req.params;
    const userId = req.userInfo.id;
    const { comment } = req.body;

    // Joi validation
    const schema = newCommentOfferJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      if (
        validation.error.message ===
        `"comment" length must be less than or equal to 170 characters long`
      )
        throw generateError(
          "El comentario no puede superar los 170 carácteres",
          401
        );
    }

    // Query: Get information of the offer that we want to comment
    await getSingleOfferQuery(offerId);

    // Query: Add comment
    const info = await postCommentQuery(offerId, userId, comment);

    res.status(201).send({
      status: "ok",
      message: `Comentario registrado con el id: ${info.newCommentId}`,
      data: info.comments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postComment };
