const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.get("/", viewController.getHomeView);
// router.get("/login")
module.exports = router;