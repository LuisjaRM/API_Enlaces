// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/offersQueries/offersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const allOffers = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un get de allUrls",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { allOffers };
