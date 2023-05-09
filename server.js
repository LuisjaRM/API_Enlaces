// Requires npm ↓

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

const {
  handleErrors,
  notFound,
  userExists,
} = require("./middlewares/middlewares");

// Controllers requires ↓

const {
  newUser,
  login,
  modifyUser,
  modifyPassword,
  validateUser,
  deleteUser,
  recoverUserPassword,
  ResetUserPassword,
} = require("./controllers/users/userControllers");

const {
  newUrl,
  allUrls,
  urlByID,
  modifyUrl,
  deleteUrl,
  voteUrl,
} = require("./controllers/urls/urlControllers");

// Users routers ↓

app.post("/users/new-user", userExists, newUser);
app.get("/users/validate/:regCode", validateUser);
app.post("/users/login", login);
app.patch("/users/modify-user/:id", modifyUser);
app.delete("/users/delete/:id", deleteUser);
app.patch("/users/modify-password", modifyPassword);
app.post("/users/recover-password", recoverUserPassword);
app.post("/users/reset-password", ResetUserPassword);

// Urls routers ↓

app.post("/urls/new-url", newUrl);
app.get("/urls", allUrls);
app.get("/urls/:id", urlByID);
app.patch("/urls/modify-url/:id", modifyUrl);
app.delete("/urls/delete/:id", deleteUrl);
app.post("urls/vote/:id", voteUrl);
// poner un comentario
// modificar un comentario
// borrar un comentario
// votar un comentario
// Ordenar por votos

// Middleware Error y Not Found ↓

app.use(notFound);
app.use(handleErrors);

// App listen ↓

app.listen(PORT, () => {
  console.log(`API Express on ${HOST}:${PORT}`);
});
