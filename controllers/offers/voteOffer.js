// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/offersQueries/offersQueries");

// Requires Jois ↓

const {} = require("../../jois/offerSchemas");

// Controller ↓

const voteOffer = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de voteUrl",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { voteOffer };
