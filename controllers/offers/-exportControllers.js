const { deleteComment } = require("./deleteComment");
const { deleteOffer } = require("./deleteOffer");
const { getFavoritesOffers } = require("./getFavoritesOffers");
const { getFilterOffers } = require("./getFilterOffers");
const { getOffers } = require("./getOffers");
const { getSearch } = require("./getSearch");
const { getSingleOffer } = require("./getSingleOffer");
const { patchComment } = require("./patchComment");
const { patchFavorite } = require("./patchFavorite");
const { patchOffer } = require("./patchOffer");
const { patchOfferImage } = require("./patchOfferImage");
const { postComment } = require("./postComment");
const { postLike } = require("./postLike");
const { postOffer } = require("./postOffer");
const { postVote } = require("./postVote");

module.exports = {
  deleteComment,
  deleteOffer,
  getFavoritesOffers,
  getFilterOffers,
  getOffers,
  getSearch,
  getSingleOffer,
  patchComment,
  patchFavorite,
  patchOffer,
  patchOfferImage,
  postComment,
  postLike,
  postOffer,
  postVote,
};
