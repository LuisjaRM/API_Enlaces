// Functions requires ↓

const { generateError } = require("../../services/generateError");

// Query require ↓

const { postUserQuery } = require("../../database/usersQueries/-exportQueries");

// Joi require ↓

const { newUserJoi } = require("../../jois/userSchemas");

// Controller ↓

const postUser = async (req, res, next) => {
  try {
    const { email, password, user } = req.body;

    // Joi validation
    const schema = newUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Create new user
    const id = await postUserQuery(email, password, user);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `El usuario con el id: ${id} se ha creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postUser };
