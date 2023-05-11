// Requires ↓

const { createOffer } = require("./createOffer");
const { getAllOffers } = require("./getAllOffers");
const { getOfferByID } = require("./getOfferByID");
const { voteOffer } = require("./voteOffer");

// Exports ↓

module.exports = {
  createOffer,
  getOfferByID,
  getAllOffers,
  voteOffer,
};
