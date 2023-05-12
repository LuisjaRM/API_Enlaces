// Controllers ↓

const { newUser } = require("./newUser");
const { login } = require("./login");
const { modifyUser } = require("./modifyUser");
const { modifyPassword } = require("./modifyPassword");
const { validateUser } = require("./validateUser");
const { deleteUser } = require("./deleteUser");
const { recoverPassword } = require("./recoverPassword");
const { resetPassword } = require("./resetPassword");

// Exports ↓

module.exports = {
  newUser,
  login,
  modifyUser,
  modifyPassword,
  validateUser,
  deleteUser,
  recoverPassword,
  resetPassword,
};
