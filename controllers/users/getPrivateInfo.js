// Querie require ↓

const {
  getPrivateInfoQuery,
} = require("../../database/usersQueries/-exportQueries");

const getPrivateInfo = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query: Private information of user
    const dataUser = await getPrivateInfoQuery(id);

    res.status(201).send({
      status: "ok",
      message: `Información privada del usuario`,
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPrivateInfo };
