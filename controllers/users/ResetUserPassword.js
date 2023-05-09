// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const ResetUserPassword = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de ResetUserPassword",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ResetUserPassword };
