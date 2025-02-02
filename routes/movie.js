const express = require('express');
const {
  getMovieById,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  addReview,
} = require('../controllers/moviePageController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

// Route to get movie details by ID
router.get('/:id', getMovieById);

// Routes for watchlist
router.post('/watchlist', authenticateJWT, addToWatchlist);
router.delete('/watchlist/:movieId', authenticateJWT, removeFromWatchlist);
router.get('/watchlist/:movieId', authenticateJWT, isInWatchlist);

// Routes for favorites
router.post('/favorites', authenticateJWT, addToFavorites);
router.delete('/favorites/:movieId', authenticateJWT, removeFromFavorites);
router.get('/favorites/:movieId', authenticateJWT, isFavorite);

// Route to add a review
router.post('/reviews', authenticateJWT, addReview);

module.exports = router;