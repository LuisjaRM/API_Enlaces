// Functions require ↓

const { activateUser } = require("../../database/usersQueries/expUsersQueries");

// Controller ↓

const validateUser = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    // Query: Activate user
    await activateUser(regCode);

    res.status(200).send({
      status: "ok",
      message: `Usuario validado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { validateUser };
