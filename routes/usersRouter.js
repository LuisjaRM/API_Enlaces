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
  recoverUserPassword,
  ResetUserPassword,
} = require("../controllers/users/userControllers");

// Routes ↓

const router = express.Router();

router.post("/users/new-user", userExists, newUser);
router.get("/users/validate/:regCode", validateUser);
router.post("/users/login", login);
router.patch("/users/modify-user/:id", authUser, modifyUser);
router.delete("/users/delete/:id", authUser, deleteUser);
router.patch("/users/modify-password", authUser, modifyPassword);
router.post("/users/recover-password", authUser, recoverUserPassword);
router.post("/users/reset-password", authUser, ResetUserPassword);

module.exports = router;
