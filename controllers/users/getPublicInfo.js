// Querie require ↓

const {
  getPublicInfoQuery,
} = require("../../database/usersQueries/-exportQueries");

const getPublicInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userInfo.id;

    const dataUser = await getPublicInfoQuery(id, userId);

    res.status(201).send({
      status: "ok",
      message: `Información pública del usuario`,
      data: dataUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPublicInfo };
