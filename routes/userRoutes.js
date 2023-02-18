const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();

router.get('/', viewController.getHomeView);
router.get('/login', viewController.getLoginView);
router.get('/signup', viewController.getSignUpView);
module.exports = router;
