// Requires ↓

const { generateError } = require("../../services/helpers");

// Requires Functions database ↓

const { createNewUser } = require("../../database/userDB");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const modifyUser = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de modifyUser",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyUser };
