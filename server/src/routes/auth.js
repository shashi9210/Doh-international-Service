const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Updated import
const upload = require('../middleware/upload');
const { loginLimiter } = require('../middleware/rateLimiter');
const generateEmployeeId = require('../utils/generateId');

const router = express.Router();

// Generate Tokens
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1h' });
};

// @route   POST api/auth/register
// @desc    Register a new user (with photo)
// @access  Public (or Admin only based on flow)
router.post('/register', upload.single('photo'), async (req, res) => {
    try {
        console.log('Received Registration Data:', req.body);
        if (req.file) console.log('File received:', req.file.path);

        let { firstName, lastName, phone, email, password, confirmPassword, role, post, branch, dateOfJoining } = req.body;

        // Basic Validation
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        email = email.toLowerCase().trim();

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate Employee ID
        const employeeId = generateEmployeeId(branch);

        // Create User
        user = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            role: role || 'Employee',
            post,
            branch,
            dateOfJoining,
            employeeId,
            photo: req.file ? `/uploads/${req.file.filename}` : 'default-avatar.png'
        });

        await user.save();

        console.log(`User registered: ${email} (${employeeId})`);

        // Return success without token (require login) or with token
        // For now, return token to auto-login
        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                employeeId: user.employeeId,
                firstName,
                lastName,
                email,
                role: user.role,
                branch: user.branch,
                photo: user.photo
            }
        });

    } catch (err) {
        console.error('Registration error:', err);
        // Clean up uploaded file if error
        // if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', loginLimiter, async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase().trim();

        console.log(`Login attempt for: ${email}`);

        // Find user & include password for check
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                employeeId: user.employeeId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                branch: user.branch,
                photo: user.photo,
                post: user.post
            }
        });

    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
    // Middleware to verify token should be added here generally
    // For now, just a placeholder or helper
    res.status(400).json({ message: "Not implemented yet" });
});

module.exports = router;
