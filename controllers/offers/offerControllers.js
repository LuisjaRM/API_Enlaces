// Controllers ↓

const { newOffer } = require("./newOffer");
const { allOffers } = require("./allOffers");
const { offerByID } = require("./offerByID");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { postVoteOffer } = require("./postVoteOffer");

// Exports ↓

module.exports = {
  newOffer,
  allOffers,
  offerByID,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
};
