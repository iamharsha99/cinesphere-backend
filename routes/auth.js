const express = require('express');
const { authenticateJWT } = require('../middleware/authenticateJWT');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', authenticateJWT, logout);

module.exports = router;