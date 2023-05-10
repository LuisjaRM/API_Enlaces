// Require ↓

const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Jois ↓

const newUserJoi = joiPassword.object().keys({
  email: joiPassword.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
  user: joiPassword.string().min(4).max(15).required(),
});

const loginJoi = joiPassword.object().keys({
  email: joiPassword.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

const modifyUserJoi = joiPassword.object().keys({
  email: joiPassword.string().email(),
  user: joiPassword.string().min(4).max(15),
});

module.exports = { newUserJoi, loginJoi, modifyUserJoi };
