const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.route("/").get(userControllers.getAllUser);

module.exports = router;
