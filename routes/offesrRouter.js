// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { authUser, offerUrlRepeat } = require("../middlewares/expMiddlewares");

// Controllers requires ↓

const {
  newOffer,
  allOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
  offersByVotes,
  commentOffer,
  commentsById,
  modifyComment,
  likeCommentOffer,
} = require("../controllers/offers/offerControllers");

// Routes ↓

const router = express.Router();

router.post("/offers/new-offer", authUser, offerUrlRepeat, newOffer);
router.get("/offers/all-offers", authUser, allOffers);
router.get("/offers/get-by-id/:id", authUser, offerById);
router.patch("/offers/modify-offer/:id", authUser, modifyOffer);
router.delete("/offers/delete/:id", authUser, deleteOffer);
router.post("/offers/vote/:id", authUser, postVoteOffer);
router.get("/offers/order-by-votes", authUser, offersByVotes);
router.post("/offers/comment/:id", authUser, commentOffer);
router.get("/offers/comments-of-offer/:id", authUser, commentsById);
router.patch("/offers/modify-comment/:id", authUser, modifyComment);
// borrar un comentario
router.post("/offers/like-to-comment/:id", authUser, likeCommentOffer);

module.exports = router;
