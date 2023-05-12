const { createNewUser } = require("./createNewUser");
const { activateUser } = require("./activateUser");
const { checkEmailandPassword } = require("./checkEmailandPassword");
const { updateUser } = require("./updateUser");
const { queryDeleteUser } = require("./queryDeleteUser");

module.exports = {
  createNewUser,
  activateUser,
  checkEmailandPassword,
  updateUser,
  queryDeleteUser,
};
