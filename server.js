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
  offerUrlRepeat,
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
  newOffer,
  allOffers,
  offerById,
  modifyOffer,
  deleteOffer,
  postVoteOffer,
} = require("./controllers/offers/offerControllers");

// Users routers ↓

app.post("/users/new-user", userExists, newUser);
app.get("/users/validate/:regCode", validateUser);
app.post("/users/login", login);
app.patch("/users/modify-user/:id", authUser, modifyUser);
app.delete("/users/delete/:id", authUser, deleteUser);
app.patch("/users/modify-password", authUser, modifyPassword);
app.post("/users/recover-password", authUser, recoverUserPassword);
app.post("/users/reset-password", authUser, ResetUserPassword);

// Offers routers ↓

app.post("/offers/new-offer", authUser, offerUrlRepeat, newOffer);
app.get("/offers", authUser, allOffers);
app.get("/offers/:id", authUser, offerById);
app.delete("/offers/delete/:id", authUser, deleteOffer);
app.post("/offers/vote/:id", authUser, postVoteOffer);
app.patch("/offers/modify-offer/:id", authUser, modifyOffer);
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
