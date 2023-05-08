// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const login = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de login",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
