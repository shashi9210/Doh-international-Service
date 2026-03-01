const express = require('express');
const { getUsers, getUsersByBranch, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET api/users
// @desc    Get all users (with RBAC)
// @access  Private
router.get('/', protect, getUsers);

// @route   GET api/users/branch/:branchName
// @desc    Get users by branch (with RBAC)
// @access  Private
router.get('/branch/:branchName', protect, getUsersByBranch);

// @route   GET api/users/profile (Alias for /api/profile if needed elsewhere)
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, getProfile);

module.exports = router;
