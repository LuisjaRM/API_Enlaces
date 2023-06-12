// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  swithPassword,
} = require("../../database/usersQueries/expUsersQueries");

// Joi require ↓

const { resetPasswordJoi } = require("../../jois/userSchemas");

// Controller ↓

const resetPassword = async (req, res, next) => {
  try {
    const { recoverCode, newPassword } = req.body;

    // Joi validation
    const schema = resetPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    //Query: swithPassword
    await swithPassword(recoverCode, newPassword);

    res.status(201).send({
      status: "ok",
      message: "Se ha reestablecido la contraseña correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetPassword };
