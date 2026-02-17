const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route   GET api/users
// @desc    Get users by branch
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { branch } = req.query;
        let query = {};

        if (branch) {
            query.branch = branch;
        }

        const users = await User.find(query)
            .select('firstName lastName email phone role post branch employeeId photo dateOfJoining')
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
