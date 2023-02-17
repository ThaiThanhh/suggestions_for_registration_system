const express = require('express');
const viewController = require('../controllers/viewController');
const router = express.Router();

router.get('/', viewController.getHomeView);
router.get('/login', viewController.getLoginView);
module.exports = router;
