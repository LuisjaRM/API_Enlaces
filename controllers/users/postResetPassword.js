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
      throw generateError(validation.error.message, 401);
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
