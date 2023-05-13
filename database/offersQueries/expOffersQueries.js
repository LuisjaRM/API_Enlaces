const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getTodayOffers } = require("./getTodayOffers");
const { getOfferById } = require("./getOfferById");
const { voteOffer } = require("./voteOffer");
const { deteleOfferById } = require("./deleteOfferById");
const { addCommentOffer } = require("./addCommentOffer");
const { orderByVotes } = require("./orderByVotes");
const { updateOffer } = require("./updateOffer");
const { getCommentsById } = require("./getCommentsById");
const { updateComment } = require("./updateComment");
const { getSingleCommentOffer } = require("./getSingleCommentOffer");
const { likeComment } = require("./likeComment");

module.exports = {
  createOffer,
  getOfferById,
  getTodayOffers,
  getAllOffers,
  voteOffer,
  deteleOfferById,
  orderByVotes,
  updateOffer,
  addCommentOffer,
  getCommentsById,
  updateComment,
  getSingleCommentOffer,
  likeComment,
};
