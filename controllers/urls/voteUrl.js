// Requires ↓

const { generateError } = require("../../services/helpers");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const voteUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de voteUrl",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { voteUrl };
