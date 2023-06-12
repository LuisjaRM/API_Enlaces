// Npm require  ↓

const jwt = require("jsonwebtoken");

// Functions requires ↓

const { generateError } = require("../../services/generateError");
const {
  checkEmailandPassword,
} = require("../../database/usersQueries/expUsersQueries");

// Joi require ↓

const { loginJoi } = require("../../jois/userSchemas");

// Controller ↓

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Joi validation
    const schema = loginJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 400);
    }

    // Query: Check password and email
    const info = await checkEmailandPassword(email, password);

    // Check info
    if (info === undefined) {
      throw generateError("Email o contraseña incorrectos", 401);
    }

    // If the info is a object, generate a token
    const token = jwt.sign(info, process.env.SECRET_TOKEN, {
      expiresIn: "30d",
    });

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Login",
      data: {
        token,
        info,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
