// Returns the public information of a user by his id

const {
  getUserByIdQuerie,
} = require("../../database/usersQueries/getUserByIdQuerie");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataUser = await getUserByIdQuerie(id);

    res.status(200).send({
      status: "ok",
      message: `Información del usuario`,
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
