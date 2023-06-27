// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Query require ↓

const { postUserQuery } = require("../../database/usersQueries/-exportQueries");

// Joi require ↓

const { newUserJoi } = require("../../jois/userSchemas");

// Controller ↓

const postUser = async (req, res, next) => {
  try {
    const { email, password, user } = req.body;

    // Joi validation
    const schema = newUserJoi;
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

      if (
        validation.error.message ===
        `"user" length must be at least 4 characters long`
      )
        throw generateError(
          "El nombre de usuario debe contener al menos 4 carácteres",
          401
        );

      if (
        validation.error.message ===
        `"user" length must be less than or equal to 15 characters long`
      )
        throw generateError(
          "El nombre de usuario no debe contener más de 15 carácteres",
          401
        );
    }

    // Query: Create new user
    const id = await postUserQuery(email, password, user);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `El usuario con el id: ${id} se ha creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postUser };
