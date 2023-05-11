// Controllers ↓

const { newOffer } = require("./newOffer");
const { allOffers } = require("./allOffers");
const { offerById } = require("./offerById");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { postVoteOffer } = require("./postVoteOffer");

// Exports ↓

module.exports = {
  newOffer,
  allOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
};
