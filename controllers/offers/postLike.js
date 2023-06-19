// Querie require ↓

const {
  postLikeQuery,
} = require("../../database/offersQueries/-exportQueries");

// Controller ↓

const postLike = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userInfo.id;

    // Query: like comment
    const likeInfo = await postLikeQuery(commentId, userId);

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

module.exports = { postLike };
