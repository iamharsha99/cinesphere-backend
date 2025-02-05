const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { getTrendingMovies } = require('../controllers/homeController');
router.get('/', authenticateJWT,getTrendingMovies);

module.exports = router;