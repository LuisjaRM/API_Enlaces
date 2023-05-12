const { createNewUser } = require("./createNewUser");
const { activateUser } = require("./activateUser");
const { checkEmailandPassword } = require("./checkEmailandPassword");
const { updateUser } = require("./updateUser");
const { queryDeleteUser } = require("./queryDeleteUser");
const { changePassword } = require("./changePassword");
const { recoverCode } = require("./recoverCode");
const { swithPassword } = require("./swithPassword");

module.exports = {
  createNewUser,
  activateUser,
  checkEmailandPassword,
  updateUser,
  queryDeleteUser,
  changePassword,
  recoverCode,
  swithPassword,
};
