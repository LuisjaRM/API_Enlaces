const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getOfferById } = require("./getOfferById");
const { voteOffer } = require("./voteOffer");
const { deteleOfferById } = require("./deleteOfferById");
const { postCommentOffer } = require("./addCommentOffer");
const { orderByVotes } = require("./orderByVotes");
const { updateOffer } = require("./updateOffer");


module.exports = {
  createOffer,
  getOfferById,
  getAllOffers,
  voteOffer,
  deteleOfferById,
  orderByVotes,
  updateOffer,
  postCommentOffer;
};
