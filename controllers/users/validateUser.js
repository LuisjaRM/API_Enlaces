// Requires Functions database ↓

const { activateUser } = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const {} = require("../../jois/schemas");

// Controller ↓

const validateUser = async (req, res) => {
  try {
    const { regCode } = req.params;

    // Activate user
    await activateUser(regCode);

    res.status(200).send({
      status: "ok",
      message: `Usuario validado`,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = { validateUser };
