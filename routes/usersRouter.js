// Npm Requires ↓

const express = require("express");

// Middlewares requires ↓

const { userExists, authUser } = require("../middlewares/-exportMiddlewares");

// Controllers requires ↓

const {
  deleteUser,
  getPrivateInfo,
  getPublicInfo,
  getValidate,
  patchPassword,
  patchUser,
  postLogin,
  postRecoverPassword,
  postResetPassword,
  postUser,
} = require("../controllers/users/-exportControllers");

// Routes ↓

const router = express.Router();

router.delete("/user/:id", authUser, userExists, deleteUser);
router.get("/user", authUser, getPrivateInfo);
router.get("/user/:id", authUser, getPublicInfo);
router.get("/validate/:regCode", getValidate);
router.patch("/password", authUser, patchPassword);
router.patch("/user", authUser, patchUser);
router.post("/login", postLogin);
router.post("/password/recover", postRecoverPassword);
router.post("/password/reset", postResetPassword);
router.post("/user", userExists, postUser);

module.exports = router;
