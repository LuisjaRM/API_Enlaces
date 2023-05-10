// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const { modifyUserQuery } = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const { modifyUserJoi } = require("../../jois/schemas");

// Controller ↓

const modifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, user } = req.body;

    // Joi validation
    const schema = modifyUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      return generateError(validation.error.message, 401);
    }


    // Check id or admin role
    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      throw generateError(
        "No tienes permisos para modificar este usuario",
        401
      );
    }
    
    res.send({
      status: "ok",
      message: `El usuario con el id:${id} se ha actualizado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { modifyUser };
