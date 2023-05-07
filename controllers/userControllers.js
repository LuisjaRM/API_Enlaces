// Requires ↓

const { a } = require("../database/userDB");

// Controllers ↓

const newUser = async (req, res, next) => {
  try {
    res.send({
      status: "ok",
      message: "Soy un post de newUser",
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

const modifyPasswrod = async (req, res, next) => {
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
  modifyPasswrod,
};
