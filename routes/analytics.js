const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, getAnalytics);

module.exports = router;