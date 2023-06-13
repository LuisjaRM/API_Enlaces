const { newOffer } = require("./newOffer");
const { filterOffers } = require("./filterOffers");
const { offerById } = require("./offerById");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { postVoteOffer } = require("./postVoteOffer");
const { commentOffer } = require("./commentOffer");
const { commentsById } = require("./commentsById");
const { modifyComment } = require("./modifyComment");
const { commentDelete } = require("./commentDelete");
const { likeCommentOffer } = require("./likeCommentOffer");

module.exports = {
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
};
