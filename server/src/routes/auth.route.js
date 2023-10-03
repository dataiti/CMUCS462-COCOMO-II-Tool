const express = require("express");
const {
  register,
  login,
  logout,
  socialLogin,
  socialLoginUpdateInfo,
  createToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/social-login", socialLogin, socialLoginUpdateInfo, createToken);

module.exports = router;
