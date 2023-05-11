// Requires ↓

const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getOfferById } = require("./getOfferById");
const { voteOffer } = require("./voteOffer");
const { deteleOfferById } = require("./deleteOfferById");
// Exports ↓

module.exports = {
  createOffer,
  getOfferById,
  getAllOffers,
  voteOffer,
  deteleOfferById,
};
