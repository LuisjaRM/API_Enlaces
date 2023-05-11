// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const { updateUser } = require("../../database/usersQueries/expUsersQueries");

// Requires Jois ↓

const { modifyUserJoi } = require("../../jois/userSchemas");

// Controller ↓

const modifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, user } = req.body;

    // Joi validation
    const schema = modifyUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Check id or admin role
    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      throw generateError(
        "No tienes permisos para modificar este usuario",
        401
      );
    }

    try {
      // Save avatar in a var
      const filesAvatar = req.files.avatar;

      // Try set avatar if exists
      await updateUser(id, email, user, filesAvatar);
    } catch {
      // If not exists call updateUser without filesAvatar
      await updateUser(id, email, user);
    }

    // Res.send
    res.status(200).send({
      status: "ok",
      message: "Las modificaciones se han realizado con éxito",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyUser };
