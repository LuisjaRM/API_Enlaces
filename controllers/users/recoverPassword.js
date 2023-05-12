// Functions requires ↓

const { generateError } = require("../../services/generateError");
const { recoverCode } = require("../../database/usersQueries/expUsersQueries");

// Joi require ↓

const { recoverPasswordJoi } = require("../../jois/userSchemas");

// Controller ↓

const recoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Joi validation
    const schema = recoverPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: create recoverCode
    await recoverCode(email);

    res.status(200).send({
      status: "ok",
      message: "Se ha solicitado su cambio de contraseña",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { recoverPassword };
