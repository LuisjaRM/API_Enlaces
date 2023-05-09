// Requires ↓

const chalk = require("chalk");

// Function ↓

const error = async (error, req, res, next) => {
  console.error(chalk.red(error));

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
};

module.exports = error;
