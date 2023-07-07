// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Querie require ↓

const {
  postRecoverPasswordQuery,
} = require("../../database/usersQueries/-exportQueries");

// Joi require ↓

const { recoverPasswordJoi } = require("../../jois/userSchemas");

// Controller ↓

const postRecoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Joi validation
    const schema = recoverPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 400);
    }

    // Query: create recoverCode
    await postRecoverPasswordQuery(email);

    res.status(200).send({
      status: "ok",
      message: "Se ha solicitado su cambio de contraseña",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postRecoverPassword };
