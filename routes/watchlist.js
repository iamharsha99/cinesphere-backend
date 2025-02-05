const express = require('express');
const { getWatchlist } = require('../controllers/watchlistController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, getWatchlist);

module.exports = router;