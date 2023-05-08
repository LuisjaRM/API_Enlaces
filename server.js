// Requires ↓

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// envs ↓

const { HOST, PORT } = process.env;

// Middlewares ↓

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Middlewares requires ↓

const { handleErrors, notFound } = require("./middlewares/middlewares");

// Controllers requires ↓

const {
  newUser,
  login,
  modifyUser,
  modifyPassword,
} = require("./controllers/users/userControllers");

const {
  newUrl,
  allUrls,
  urlByID,
  modifyUrl,
  deleteUrl,
  voteUrl,
} = require("./controllers/urls/urlControllers");

const validateUser = require("./database/validateUserDB");

// Users routers ↓

app.post("/users/newUser", newUser);
app.post("/users/login", login);
app.patch("/users/modifyUser", modifyUser);
// delete user
app.patch("/users/modifyPassword", modifyPassword);
app.get("/users/validate/:regCode", validateUser);
// recoverUSerPassword
// ResetUserPassword

// Urls routers ↓

app.post("/urls/newUrl", newUrl);
app.get("/urls", allUrls);
app.get("/urls/:id", urlByID);
app.patch("/urls/modifyUrl", modifyUrl);
app.delete("/urls/:id", deleteUrl);
app.post("urls/:id/vote", voteUrl);
// poner un comentario
// modificar un comentario
// borrar un comentario
// votar un comentario

// Middleware Error y Not Found ↓

app.use(notFound);
app.use(handleErrors);

// App listen ↓

app.listen(PORT, () => {
  console.log(`API Express on ${HOST}:${PORT}`);
});
