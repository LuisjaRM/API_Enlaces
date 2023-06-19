const { deleteUserQuery } = require("./deleteUserQuery");
const { getPrivateInfoQuery } = require("./getPrivateInfoQuery");
const { getPublicInfoQuery } = require("./getPublicInfoQuery");
const { getValidateQuery } = require("./getValidateQuery");
const { patchPasswordQuery } = require("./patchPasswordQuery");
const { patchUserQuery } = require("./patchUserQuery");
const { postLoginQuery } = require("./postLoginQuery");
const { postRecoverPasswordQuery } = require("./postRecoverPasswordQuery");
const { postResetPasswordQuery } = require("./postResetPasswordQuery");
const { postUserQuery } = require("./postUserQuery");

module.exports = {
  deleteUserQuery,
  getPrivateInfoQuery,
  getPublicInfoQuery,
  getValidateQuery,
  patchPasswordQuery,
  patchUserQuery,
  postLoginQuery,
  postRecoverPasswordQuery,
  postResetPasswordQuery,
  postUserQuery,
};
