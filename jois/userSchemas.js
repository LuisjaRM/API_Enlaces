// Npm require ↓

const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

// Schemas ↓

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

const loginJoi = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const modifyUserJoi = Joi.object().keys({
  email: Joi.string().email(),
  user: Joi.string().min(4).max(15),
});

module.exports = { newUserJoi, loginJoi, modifyUserJoi };
