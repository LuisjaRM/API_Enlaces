// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  queryDeleteUser,
} = require("../../database/usersQueries/expUsersQueries");

// Controller ↓

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check id or admin role
    if (req.userInfo.id !== parseInt(id) && req.userInfo.role != "admin") {
      throw generateError("No tienes permiso para borrar este usuario", 401);
    }

    await queryDeleteUser(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `El usuario con el id:${id} ha sido borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
