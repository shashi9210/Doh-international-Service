const User = require('../models/User');

/**
 * @desc    Get all users with strict RBAC filtering logic
 * @route   GET /api/users
 * @access  Private
 */
exports.getUsers = async (req, res) => {
    try {
        let query = {};
        const { branch } = req.query;

        if (branch) {
            query.branch = branch;
        }

        const users = await User.find(query)
            .select('firstName lastName email phone role post branch employeeId photo dateOfJoining')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.error('getUsers error:', err.message);
        res.status(500).json({ success: false, message: 'Server Error during user retrieval' });
    }
};

/**
 * @desc    Get users by branch specifically
 * @route   GET /api/users/branch/:branchName
 * @access  Private
 */
exports.getUsersByBranch = async (req, res) => {
    try {
        const { branchName } = req.params;
        const query = { branch: branchName };

        const users = await User.find(query)
            .select('firstName lastName email phone role post branch employeeId photo dateOfJoining')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.error('getUsersByBranch error:', err.message);
        res.status(500).json({ success: false, message: 'Server Error during branch-specific user retrieval' });
    }
};

/**
 * @desc    Get current user profile (optimized sensitive data exclusion)
 * @route   GET /api/profile
 * @access  Private
 */
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error('getProfile error:', err.message);
        res.status(500).json({ success: false, message: 'Server Error during profile retrieval' });
    }
};
