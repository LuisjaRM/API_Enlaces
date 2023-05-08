// Requires ↓

const { generateError } = require("../../services/helpers");

// Requires Functions database ↓

const {} = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const modifyUrl = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de modifyUrl",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyUrl };
