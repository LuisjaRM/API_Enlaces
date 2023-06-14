// Functions requires ↓

const { generateError } = require("../../services/generateError");
const { updateUser } = require("../../database/usersQueries/expUsersQueries");

// Joi require ↓

const { modifyUserJoi } = require("../../jois/userSchemas");

// Controller ↓

const modifyUser = async (req, res, next) => {
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
      await updateUser(id, email, user, filesAvatar);
    } catch {
      // If not exists call updateUser without filesAvatar
      await updateUser(id, email, user);
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

module.exports = { modifyUser };
