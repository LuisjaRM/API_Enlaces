// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  patchUserQuery,
} = require("../../database/usersQueries/-exportQueries");

// Joi require ↓

const { modifyUserJoi } = require("../../jois/userSchemas");

// Controller ↓

const patchUser = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { email, user } = req.body;

    let filesAvatar;
    try {
      filesAvatar = req.files.avatar;
    } catch (error) {
      filesAvatar = null;
    }

    if (!filesAvatar) {
      // Joi validation
      const schema = modifyUserJoi;
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

      // Check id
      if (req.userInfo.id !== parseInt(id)) {
        throw generateError(
          "No tienes permisos para modificar este usuario",
          401
        );
      }
    }

    // Query:
    if (filesAvatar) {
      await patchUserQuery({ id, filesAvatar });
    } else if (email) {
      await patchUserQuery({ id, email });
    } else {
      await patchUserQuery({ id, user });
    }

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Las modificaciones se han realizado con éxito",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchUser };
