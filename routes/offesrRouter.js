// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const {
  authUser,
  offerUrlRepeat,
  checkIsLogin,
} = require("../middlewares/-exportMiddlewares");

// Controllers requires ↓

const {
  deleteComment,
  deleteOffer,
  getFavoritesOffers,
  getOffers,
  getSingleOffer,
  patchComment,
  patchFavorite,
  patchOffer,
  patchOfferImage,
  postComment,
  postLike,
  postOffer,
  postVote,
} = require("../controllers/offers/-exportControllers");

// Routes ↓

const router = express.Router();

router.delete("/comment/:offerId/:commentId", authUser, deleteComment);
router.delete("/offer/:id", authUser, deleteOffer);
router.get("/favorites", authUser, getFavoritesOffers);
router.get("/offers", checkIsLogin, getOffers);
router.get("/offer/:id", authUser, getSingleOffer);
router.patch("/comment/:offerId/:commentId", authUser, patchComment);
router.patch("/favorite/:offerId", authUser, patchFavorite);
router.patch("/offer/:id", authUser, patchOffer);
router.patch("/image/:offerId", authUser, patchOfferImage);
router.post("/comment/:offerId", authUser, postComment);
router.post("/like/:commentId", authUser, postLike);
router.post("/offers", authUser, offerUrlRepeat, postOffer);
router.post("/vote/:offerId", authUser, postVote);

module.exports = router;
