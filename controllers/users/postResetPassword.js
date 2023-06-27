// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Query require ↓

const {
  postResetPasswordQuery,
} = require("../../database/usersQueries/-exportQueries");

// Joi require ↓

const { resetPasswordJoi } = require("../../jois/userSchemas");

// Controller ↓

const postResetPassword = async (req, res, next) => {
  try {
    const { recoverCode, newPassword } = req.body;

    // Joi validation
    const schema = resetPasswordJoi;
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

    //Query: swithPassword
    await postResetPasswordQuery(recoverCode, newPassword);

    res.status(201).send({
      status: "ok",
      message: "Se ha reestablecido la contraseña correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postResetPassword };
