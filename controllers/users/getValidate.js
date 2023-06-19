// Querie require ↓

const {
  getValidateQuery,
} = require("../../database/usersQueries/-exportQueries");

// Controller ↓

const getValidate = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    // Query: Activate user
    await getValidateQuery(regCode);

    res.status(200).send({
      status: "ok",
      message: `Usuario validado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getValidate };
