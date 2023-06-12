// Functions requires ↓

const {
  likeComment,
} = require("../../database/offersQueries/expOffersQueries");

// Controller ↓

const likeCommentOffer = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userInfo.id;

    // Query: like comment
    const likeInfo = await likeComment(commentId, userId);

    res.status(201).send({
      status: "ok",
      message: `Like registrado`,
      data: {
        like: likeInfo.like,
        addLikes: likeInfo.addLikes,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { likeCommentOffer };
