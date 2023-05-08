// Requires ↓

const { generateError } = require("../../services/helpers");

// Requires Functions database ↓

const { createNewUser } = require("../../database/userDB");

// Requires Jois ↓

const { newUserJoi } = require("../../jois/schemas");

// Controller ↓

const newUser = async (req, res, next) => {
  try {
    const { email, password, user } = req.body;

    // Joi validation
    const schema = newUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Create new user
    const id = await createNewUser(email, password, user);

    // Res.send
    res.send({
      status: "ok",
      message: `${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newUser };