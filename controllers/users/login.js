// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires npm  ↓

const jwt = require("jsonwebtoken");

// Requires Functions database ↓

const {
  checkEmailandPassword,
} = require("../../database/usersQueries/expUsersQueries");

// Requires Jois ↓

const { loginJoi } = require("../../jois/userSchemas");

// Controller ↓

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Joi validation
    const schema = loginJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      return generateError(validation.error.message, 400);
    }

    // Check password and email
    const info = await checkEmailandPassword(email, password);

    // Check info
    if (info === undefined) {
      throw generateError("Email o contraseña incorrectos", 401);
    }

    // If the info is a object, generate a token
    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: "1d" });

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Login",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
