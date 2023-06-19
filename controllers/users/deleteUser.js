// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Querie require ↓

const {
  deleteUserQuery,
} = require("../../database/usersQueries/-exportQueries");

// Controller ↓

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check id or admin role
    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      throw generateError("No tienes permiso para borrar este usuario", 401);
    }

    await deleteUserQuery(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `El usuario con el id:${id} fue borrado con éxito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
