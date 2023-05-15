// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  likeComment,
} = require("../../database/offersQueries/expOffersQueries");

// Joi require ↓

const { likeCommentJoi } = require("../../jois/offerSchemas");

// Controller ↓

const likeCommentOffer = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userInfo.id;
    const { like } = req.body;

    // Joi validation
    const schema = likeCommentJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: like comment
    const likes = await likeComment(commentId, userId, like);

    res.status(200).send({
      status: "ok",
      message: `Like registrado`,
      data: { numeroLikes: likes },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeCommentOffer };
