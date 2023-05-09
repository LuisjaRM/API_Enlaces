// Controllers ↓

const { newUser } = require("./newUser");
const { login } = require("./login");
const { modifyUser } = require("./modifyUser");
const { modifyPassword } = require("./modifyPassword");
const { validateUser } = require("./validateUser");
const { deleteUser } = require("./deleteUser");
const { recoverUserPassword } = require("./recoverUserPassword");
const { ResetUserPassword } = require("./ResetUserPassword");

// Exports ↓

module.exports = {
  newUser,
  login,
  modifyUser,
  modifyPassword,
  validateUser,
  deleteUser,
  recoverUserPassword,
  ResetUserPassword,
};
