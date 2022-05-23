const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const { getData, dashboardData } = require("../controllers/indexController");

router.get("/", welcomeData);

router.get("/dashboard", ensureAuthenticated, dashboardData);

module.exports = router;
