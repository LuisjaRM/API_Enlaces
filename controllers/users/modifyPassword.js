// Function requires ↓

const { generateError } = require("../../services/generateError");
const {
  changePassword,
} = require("../../database/usersQueries/expUsersQueries");

// Joi Require  ↓

const { modifyPwdJoi } = require("../../jois/userSchemas");

// Controller ↓

const modifyPassword = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { oldPassword, newPassword } = req.body;

    // Joi validation
    const schema = modifyPwdJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Check id
    if (req.userInfo.id !== parseInt(id)) {
      throw generateError(
        "No tienes permisos para modificar este usuario",
        401
      );
    }

    // Check the newPasswrod
    if (oldPassword === newPassword) {
      throw generateError("La nueva contraseña es igual a la anterior", 401);
    }

    // Query: Change password
    await changePassword(oldPassword, newPassword, id);

    res.status(201).send({
      status: "ok",
      message: `Contraseña del usuario con id: ${id} modificada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyPassword };
