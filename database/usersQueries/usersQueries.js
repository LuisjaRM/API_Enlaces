// Requires ↓

const { createNewUser } = require("./createNewUser");
const { generateRegCode } = require("./generateRegCode");
const { checkEmailandPassword } = require("./checkEmailandPassword");
const { modifyUserQuery } = require("./modifyUserQuery");
// Exports ↓

module.exports = {
  createNewUser,
  generateRegCode,
  checkEmailandPassword,
  modifyUserQuery,
};
