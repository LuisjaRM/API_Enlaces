// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {} = require("../../database/usersQueries/expUsersQueries");

// Requires Jois ↓

const {} = require("../../jois/userSchemas");

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
