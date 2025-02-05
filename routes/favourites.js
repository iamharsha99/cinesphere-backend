const express = require('express');
const { getFavorites } = require('../controllers/favouritesController');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/', authenticateJWT, getFavorites);

module.exports = router;