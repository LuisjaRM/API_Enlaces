// Requires ↓

const { createNewUser } = require("./createNewUser");
const { generateRegCode } = require("./generateRegCode");
const { checkEmailandPassword } = require("./checkEmailandPassword");
const { updateUser } = require("./updateUser");

// Exports ↓

module.exports = {
  createNewUser,
  generateRegCode,
  checkEmailandPassword,
  updateUser,
};
