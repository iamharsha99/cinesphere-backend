const express = require('express');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

// Route to get authenticated user's profile
router.get('/', authenticateJWT, getProfile);

// Route to update authenticated user's profile
router.put('/', authenticateJWT, updateProfile);

module.exports = router;