// Controllers ↓

const { deleteUser } = require("./deleteUser");
const { getPrivateInfo } = require("./getPrivateInfo");
const { getPublicInfo } = require("./getPublicInfo");
const { getValidate } = require("./getValidate");
const { patchPassword } = require("./patchPassword");
const { patchUser } = require("./patchUser");
const { postLogin } = require("./postLogin");
const { postRecoverPassword } = require("./postRecoverPassword");
const { postResetPassword } = require("./postResetPassword");
const { postUser } = require("./postUser");

// Exports ↓

module.exports = {
  deleteUser,
  getPrivateInfo,
  getPublicInfo,
  getValidate,
  patchPassword,
  patchUser,
  postLogin,
  postRecoverPassword,
  postResetPassword,
  postUser,
};
