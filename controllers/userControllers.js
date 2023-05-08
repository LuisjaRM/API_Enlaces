// Requires ↓

const { generateError } = require("../services/helpers");

// Requires Functions database ↓

const { createNewUser } = require("../database/userDB");

// Requires Jois ↓

const { newUserJoi } = require("../jois/schemas");

// Controllers ↓

const newUser = async (req, res, next) => {
  try {
    const { email, password, user } = req.body;

    // Joi validation
    const schema = newUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Create new user
    const id = await createNewUser(email, password, user);

    // Res.send
    res.send({
      status: "ok",
      message: `${id}`,
    });
  } catch (error) {
    next(error);
  }
};

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

// Exports ↓

module.exports = {
  newUser,
  login,
  modifyUser,
  modifyPassword,
};
