// Requires ↓

const { generateError } = require("../../services/generateError");

// Requires npm  ↓

const jwt = require("jsonwebtoken");

// Requires Functions database ↓

const { loginQuery } = require("../../database/usersQueries/usersQueries");

// Requires Jois ↓

const { loginJoi } = require("../../jois/schemas");

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
    // Aqui va la query
    const info = await loginQuery(email, password);

    // Create token
    if (info === undefined) {
      throw generateError("Email o contraseña incorrectos", 401);
    }
    const token = jwt.sign(info, process.env.SECRET_TOKEN, { expiresIn: "1d" });

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
