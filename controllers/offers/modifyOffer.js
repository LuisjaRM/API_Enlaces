// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/offersQueries/expOffersQueries");

// Requires Jois ↓

const {} = require("../../jois/offerSchemas");

// Controller ↓

const modifyOffer = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de modifyUrl",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyOffer };
