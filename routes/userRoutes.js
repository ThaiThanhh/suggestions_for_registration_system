const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", viewController.getHomeView);
router.get("/login", viewController.getLoginView);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", viewController.getSignUpView);
module.exports = router;
