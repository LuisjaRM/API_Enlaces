// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { authUser, offerUrlRepeat } = require("../middlewares/expMiddlewares");

// Controllers requires ↓

const {
  newOffer,
  modifyPhoto,
  filterOffers,
  favoriteOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
  commentOffer,
  modifyComment,
  commentDelete,
  likeCommentOffer,
} = require("../controllers/offers/offerControllers");

// Routes ↓

const router = express.Router();

router.post("/offers/new-offer", authUser, offerUrlRepeat, newOffer);
router.patch("/offers/new-offer/modifiy-photo/:id", authUser, modifyPhoto);
router.get("/offers", filterOffers);
router.patch("/offers/favorite/:id", authUser, favoriteOffers);
router.get("/offers/get-by-id/:id", offerById);
router.patch("/offers/modify-offer/:id", authUser, modifyOffer);
router.delete("/offers/delete/:id", authUser, deleteOffer);
router.post("/offers/vote/:id", authUser, postVoteOffer);
router.post("/offers/comment/:id", authUser, commentOffer);
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
