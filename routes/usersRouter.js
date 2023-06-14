// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { userExists, authUser } = require("../middlewares/expMiddlewares");

// Controllers requires ↓

const {
  newUser,
  login,
  modifyUser,
  modifyPassword,
  validateUser,
  deleteUser,
  recoverPassword,
  resetPassword,
} = require("../controllers/users/userControllers");

// Routes ↓

const router = express.Router();

router.post("/users/new-user", userExists, newUser);
router.get("/users/validate/:regCode", validateUser);
router.post("/users/login", login);
router.get("/users/:id", authUser, getUserById);
router.patch("/users/modify-user", authUser, modifyUser);
router.delete("/users/delete/:id", authUser, userExists, deleteUser);
router.patch("/users/modify-password", authUser, modifyPassword);
router.post("/users/recover-password", recoverPassword);
router.post("/users/reset-password", resetPassword);

module.exports = router;
