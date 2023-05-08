// Requires ↓

const { generateError } = require("../../services/helpers");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const modifyPassword = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de modifyPassword",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyPassword };
