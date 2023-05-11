// Controllers ↓

const { newOffer } = require("./newOffer");
const { getOffersController } = require("./alloffers");
const { offerByID } = require("./offerByID");
const { modifyOffer } = require("./modifyOffer");
const { deleteOffer } = require("./deleteOffer");
const { voteOffer } = require("./voteOffer");

// Exports ↓

module.exports = {
  newOffer,
  getOffersController,
  offerByID,
  modifyOffer,
  deleteOffer,
  voteOffer,
};
