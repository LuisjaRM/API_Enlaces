// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires Functions database ↓

const {deletUser} = require("../../database/usersQueries/expUsersQueries");


// Controller ↓

const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    
     //Añadir getUserById o modificar el if
    if (req.userInfo.id !== offer.user_id && req.userInfo.role != "admin") {
      throw generateError("No tienes permiso para borrar este usuario", 401);
    }

    await deletUser(id)

    res.send({
      status: "ok",
      message: `El usuario con el id:${id} ha sido borrado.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
