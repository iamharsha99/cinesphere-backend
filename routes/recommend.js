const express = require('express');
const { getMovies, getRecentFavorites, searchMovies } = require('../controllers/recommenderController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/movies',authenticateJWT,getMovies);
router.get('/recent_favorites',authenticateJWT,getRecentFavorites);
router.get('/search', authenticateJWT, searchMovies);
module.exports = router;