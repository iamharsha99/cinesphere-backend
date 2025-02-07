const express = require('express');
const { searchMovies } = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchMovies);

module.exports = router;