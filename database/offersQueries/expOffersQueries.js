const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getOfferById } = require("./getOfferById");
const { voteOffer } = require("./voteOffer");
const { deteleOfferById } = require("./deleteOfferById");
const { orderOffersByVotes } = require("./orderOffersByVotes");
const { modifyOfferQuery } = require("./modifyOfferQ");
const { postCommentOffer } = require("./addCommentOffer");

postCommentOffer;
module.exports = {
  createOffer,
  getOfferById,
  getAllOffers,
  voteOffer,
  deteleOfferById,
  orderOffersByVotes,
  modifyOfferQuery,
  postCommentOffer,
};
