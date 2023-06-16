const { newOffer } = require("./newOffer");
const { modifyPhoto } = require("./modifyPhoto");
const { filterOffers } = require("./filterOffers");
const { favoriteOffers } = require("./favoriteOffers");
const { offerById } = require("./offerById");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { postVoteOffer } = require("./postVoteOffer");
const { commentOffer } = require("./commentOffer");
const { modifyComment } = require("./modifyComment");
const { commentDelete } = require("./commentDelete");
const { likeCommentOffer } = require("./likeCommentOffer");

module.exports = {
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
};
