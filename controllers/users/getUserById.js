// Returns the public information of a user by his id

const { offersOfUser } = require("../../database/usersQueries/offersOfUser");

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataUser = await offersOfUser(id);

    res.status(201).send({
      status: "ok",
      message: `Información pública del usuario`,
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
