// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const {
  authUser,
  offerUrlRepeat,
} = require("../middlewares/-exportMiddlewares");

// Controllers requires ↓

const {
  deleteComment,
  deleteOffer,
  getCheckIsFavorite,
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
router.delete("/offers/:id", authUser, deleteOffer);
router.get("/isFavorite/:offerId", authUser, getCheckIsFavorite);
router.get("/favorites", authUser, getFavoritesOffers);
router.get("/offers", getOffers);
router.get("/offers/:id", authUser, getSingleOffer);
router.patch("/comment/:offerId/:commentId", authUser, patchComment);
router.patch("/favorite/:offerId", authUser, patchFavorite);
router.patch("/offers/:id", authUser, patchOffer);
router.patch("/image/:offerId", authUser, patchOfferImage);
router.post("/comment/:offerId", authUser, postComment);
router.post("/like/:commentId", authUser, postLike);
router.post("/offers", authUser, offerUrlRepeat, postOffer);
router.post("/vote/:offerId", authUser, postVote);

module.exports = router;
