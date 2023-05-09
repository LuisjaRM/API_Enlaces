// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const validateUser = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un path de validateUser",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { validateUser };
