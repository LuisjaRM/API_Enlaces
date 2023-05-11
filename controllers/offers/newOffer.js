// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/offersQueries/offersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const newOffer = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de newUrl",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newOffer };
