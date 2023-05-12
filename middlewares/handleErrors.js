// Npm requires ↓

const chalk = require("chalk");

// Middleware ↓

const error = async (error, req, res, next) => {
  console.error(chalk.red(error));
  console.error(error); // Borrar al final del proyecto

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
};

module.exports = error;
