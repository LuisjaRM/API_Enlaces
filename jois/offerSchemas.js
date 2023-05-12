// Npm require ↓

const Joi = require("joi");

// Schemas ↓

const newOfferJoi = Joi.object().keys({
  url: Joi.string().max(280).required(),
  title: Joi.string().max(60).required(),
  descrip: Joi.string().max(280),
  price: Joi.number().positive().precision(2),
  offer_price: Joi.number().positive().precision(2),
  plataform: Joi.string().max(60),
  offer_expiry: Joi.date(),
});

const voteOfferJoi = Joi.object().keys({
  vote: Joi.number().positive().min(1).max(5).required(),
});

const likeCommentJoi = Joi.object().keys({
  like: Joi.number().positive().min(1).max(1).required(),
});

const commentOfferJoi = Joi.object().keys({
  comment: Joi.string().max(280).required(),
});

const modifyOfferJoi = Joi.object().keys({
  url: Joi.string().max(280),
  title: Joi.string().max(60),
  descrip: Joi.string().max(280),
  price: Joi.number().positive().precision(2),
  offer_price: Joi.number().positive().precision(2),
  plataform: Joi.string().max(60),
  offer_expiry: Joi.date(),
});

module.exports = { newOfferJoi, voteOfferJoi, modifyOfferJoi, commentOfferJoi };
