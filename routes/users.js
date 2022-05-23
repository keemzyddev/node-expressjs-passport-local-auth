const express = require("express");
const router = express.Router();
const {
  loginData,
  regData,
  regHandle,
  loginHandle,
} = require("../controllers/userController");

const bcrypt = require("bcryptjs");

//user model
const User = require("../models/User");

//login page
router.get("/login", loginData);

// register page
router.get("/register", regData);

router.post("/register", regHandle);

router.post("/login", loginHandle);

router.get("/logout", logoutHandle);

module.exports = router;
