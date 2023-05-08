// Controllers ↓

const { newUser } = require("./newUser");
const { login } = require("./login");
const { modifyUser } = require("./modifyUser");
const { modifyPassword } = require("./modifyPassword");

// Exports ↓

module.exports = {
  newUser,
  login,
  modifyUser,
  modifyPassword,
};
