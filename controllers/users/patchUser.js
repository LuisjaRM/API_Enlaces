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
    const filesAvatar = req.files.avatar;

    if (!filesAvatar) {
      // Joi validation
      const schema = modifyUserJoi;
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
    }

    // Query:
    try {
      // Try set avatar if exists
      await patchUserQuery(id, email, user, filesAvatar);
    } catch {
      // If not exists call updateUser without filesAvatar
      await patchUserQuery(id, email, user);
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
