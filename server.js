// Requires npm ↓

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// envs ↓

const { HOST, PORT } = process.env;

// Middlewares ↓

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Config static dir

const path = require("path");
const staticDir = path.join(__dirname, "./uploads");

app.use(express.static(staticDir));

// Middlewares requires ↓

const {
  handleErrors,
  notFound,
  userExists,
  authUser,
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
app.patch("/users/modify-user/:id", authUser, modifyUser);
app.delete("/users/delete/:id", authUser, deleteUser);
app.patch("/users/modify-password", authUser, modifyPassword);
app.post("/users/recover-password", authUser, recoverUserPassword);
app.post("/users/reset-password", authUser, ResetUserPassword);

// Urls routers ↓

app.post("/urls/new-url", authUser, newUrl);
app.get("/urls", authUser, allUrls);
app.get("/urls/:id", authUser, urlByID);
app.patch("/urls/modify-url/:id", authUser, modifyUrl);
app.delete("/urls/delete/:id", authUser, deleteUrl);
app.post("urls/vote/:id", authUser, voteUrl);
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
