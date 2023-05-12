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
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    // Joi validation
    const schema = modifyPwdJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    await changePassword(oldPassword, newPassword, id);

    res.status(200).send({
      status: "ok",
      message: `Contraseña del usuario con id: ${id} modificada`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyPassword };
