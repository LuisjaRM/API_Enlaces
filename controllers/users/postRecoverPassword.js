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
      if (
        validation.error.message ===
        `"password" length must be at least 8 characters long`
      )
        throw generateError(
          "La contraseña debe tener al menos 8 carácteres",
          401
        );

      if (
        validation.error.message ===
        `"password" length must be less than or equal to 20 characters long`
      )
        throw generateError(
          "La contraseña debe tener más de 20 carácteres",
          401
        );

      if (
        validation.error.message ===
        `"password" should not contain white spaces`
      )
        throw generateError(
          "La contraseña no debe contener espacios en blanco",
          401
        );

      if (
        validation.error.message ===
        `"password" should contain at least 1 special character`
      )
        throw generateError(
          "La contraseña debe contener al menos un carácter especial",
          401
        );

      if (
        validation.error.message ===
        `"password" should contain at least 1 uppercase character`
      )
        throw generateError(
          "La contraseña debe contener al menos una letra en mayúscula",
          401
        );

      if (
        validation.error.message ===
        `"password" should contain at least 1 numeric character`
      )
        throw generateError(
          "La contraseña debe contener al menos un número",
          401
        );
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
