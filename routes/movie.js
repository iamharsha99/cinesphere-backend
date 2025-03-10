const express = require('express');
const {
  getMovieById,
  getMovieByTitles, // New controller function
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  addReview,
  getMovieReviews,
  getMovieByIds
} = require('../controllers/moviePageController');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { getTrendingMovies } = require('../controllers/homeController');
const router = express.Router();

// Route to get movie details by ID
router.get('/:id', getMovieById);

// Route to get movie details by titles
router.post('/details', getMovieByIds); // New route

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
router.get('/:id/reviews', authenticateJWT, getMovieReviews);

module.exports = router;