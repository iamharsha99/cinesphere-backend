const express = require('express');
const { getReviews, updateReview } = require('../controllers/reviewController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, getReviews);

router.put('/:id', authenticateJWT, updateReview);

module.exports = router;