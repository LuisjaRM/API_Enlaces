// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/usersQueries/usersQueries");

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
