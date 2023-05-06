// Requires ↓

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// envs ↓

const { HOST, PORT } = process.env;

// Middlewares ↓

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Middlewares requires ↓

const { handleErrors, notFound } = require("./middlewares/middlewares");

// Controllers requires ↓

const { newUser, login, modifyUser } = require("./controllers/userControllers");

const {
  newUrl,
  allUrls,
  urlByID,
  modifyUrl,
  deleteUrl,
  voteUrl,
} = require("./controllers/urlControllers");

// Users routers ↓

app.post("/users/newUser", newUser);
app.post("/users/login", login);
app.path("/users/modifyUser", modifyUser);

// Urls routers ↓

app.post("/urls/newUrl", newUrl);
app.get("/urls", allUrls);
app.get("/urls/:id", urlByID);
app.path("/urls/modifyUrl", modifyUrl);
app.delete("/urls/:id", deleteUrl);
app.post("urls/:id/vote", voteUrl);

// Middleware Error y Not Found ↓

app.use(notFound);
app.use(handleErrors);

// App listen ↓

app.listen(PORT, () => {
  console.log(`API Express on ${HOST}:${PORT}`);
});
