// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { authUser, offerUrlRepeat } = require("../middlewares/expMiddlewares");

// Controllers requires ↓

const {
  newOffer,
  filterOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
  commentOffer,
  commentsById,
  modifyComment,
  commentDelete,
  likeCommentOffer,
} = require("../controllers/offers/offerControllers");

// Routes ↓

const router = express.Router();

router.post("/offers/new-offer", authUser, offerUrlRepeat, newOffer);
router.get("/offers", filterOffers);
router.get("/offers/get-by-id/:id", authUser, offerById);
router.patch("/offers/modify-offer/:id", authUser, modifyOffer);
router.delete("/offers/delete/:id", authUser, deleteOffer);
router.post("/offers/vote/:id", authUser, postVoteOffer);
router.post("/offers/comment/:id", authUser, commentOffer);
router.get("/offers/comments-of-offer/:id", authUser, commentsById);
router.patch(
  "/offers/modify-comment/:offerId/:commentId",
  authUser,
  modifyComment
);
router.delete(
  "/offers/delete-comment/:offerId/:commentId",
  authUser,
  commentDelete
);
router.post("/offers/like-to-comment/:id", authUser, likeCommentOffer);

module.exports = router;
