// Returns private information of a user

const { getUserInfo } = require("../../database/usersQueries/getUserInfo");

const getDataUser = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    const dataUser = await getUserInfo(id);

    res.status(201).send({
      status: "ok",
      message: `Información privada del usuario`,
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDataUser };
