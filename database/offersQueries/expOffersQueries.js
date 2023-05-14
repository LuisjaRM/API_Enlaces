const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getDayOffers } = require("./getDayOffers");
const { getOfferById } = require("./getOfferById");
const { orderByVotes } = require("./orderByVotes");
const { voteOffer } = require("./voteOffer");
const { deteleOfferById } = require("./deleteOfferById");
const { addCommentOffer } = require("./addCommentOffer");
const { updateOffer } = require("./updateOffer");
const { getCommentsById } = require("./getCommentsById");
const { updateComment } = require("./updateComment");
const { deleteComment } = require("./deleteComment");
const { getSingleCommentOffer } = require("./getSingleCommentOffer");
const { likeComment } = require("./likeComment");

module.exports = {
  createOffer,
  getOfferById,
  getDayOffers,
  getAllOffers,
  orderByVotes,
  voteOffer,
  deteleOfferById,
  updateOffer,
  addCommentOffer,
  getCommentsById,
  updateComment,
  deleteComment,
  getSingleCommentOffer,
  likeComment,
};
