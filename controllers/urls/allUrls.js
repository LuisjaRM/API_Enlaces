// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const allUrls = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un get de allUrls",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { allUrls };
