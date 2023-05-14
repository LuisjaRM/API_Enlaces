const { newOffer } = require("./newOffer");
const { allOffers } = require("./allOffers");
const { dailyOffers } = require("./dailyOffers");
const { offerById } = require("./offerById");
const { offersByVotes } = require("./offersByVotes");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { postVoteOffer } = require("./postVoteOffer");
const { commentOffer } = require("./commentOffer");
const { commentsById } = require("./commentsById");
const { modifyComment } = require("./modifyComment");
const { commentDelete } = require("./commentDelete");
const { likeCommentOffer } = require("./postLikeComment");

module.exports = {
  newOffer,
  allOffers,
  dailyOffers,
  offerById,
  offersByVotes,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
  commentOffer,
  commentsById,
  modifyComment,
  commentDelete,
  likeCommentOffer,
};
