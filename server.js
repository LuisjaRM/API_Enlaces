// Requires npm ↓

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const chalk = require("chalk");

// envs ↓

const { HOST, PORT } = process.env;

// Middlewares ↓

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());
app.use(cors());

// Config static dir

const path = require("path");
const staticDir = path.join(__dirname, "./uploads");

app.use("/uploads", express.static(staticDir));

// Routers ↓

const offersRouter = require("./routes/offesrRouter");
const usersRouter = require("./routes/usersRouter");

app.use(offersRouter);
app.use(usersRouter);

// Middleware Error y Not Found ↓

const { handleErrors, notFound } = require("./middlewares/expMiddlewares");

app.use(notFound);
app.use(handleErrors);

// App listen ↓

app.listen(PORT, () => {
  console.log(chalk.blue(`API Express on ${HOST}:${PORT}`));
});
