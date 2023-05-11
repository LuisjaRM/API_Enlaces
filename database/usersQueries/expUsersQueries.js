// Requires ↓

const { createNewUser } = require("./createNewUser");
const { activateUser } = require("./activateUser");
const { checkEmailandPassword } = require("./checkEmailandPassword");
const { updateUser } = require("./updateUser");

// Exports ↓

module.exports = {
  createNewUser,
  activateUser,
  checkEmailandPassword,
  updateUser,
};
