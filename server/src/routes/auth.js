const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/authController');
const upload = require('../middleware/upload');
const { loginLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new user (with photo)
// @access  Public
router.post('/register', upload.single('photo'), register);

// @route   POST api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', loginLimiter, login);

// @route   POST api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', refreshToken);

// @route   GET api/auth/logout
// @desc    Logout user / Clear cookie
// @access  Private
router.get('/logout', protect, logout);

module.exports = router;
