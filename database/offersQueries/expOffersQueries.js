// Requires ↓

const { createOffer } = require("./createOffer");


const {getOfferByID} = require("./offerIDQuery");


const { getAllOffers } = require("./getOffersQuery");


// Exports ↓

module.exports = {
  createOffer,
  getOfferByID,
  getAllOffers,
};
