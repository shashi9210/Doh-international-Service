const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Schemas');
const router = express.Router();

// Generate Tokens
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

router.post('/register', async (req, res) => {
    try {
        let { firstName, lastName, phone, email, password, role, branch } = req.body;
        email = email.toLowerCase().trim();

        console.log(`Attempting registration for: ${email}`);

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ firstName, lastName, phone, email, password, role, branch });
        await user.save();

        console.log(`User registered successfully: ${email}`);
        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, firstName, lastName, email, role, branch } });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase().trim();

        console.log(`Login attempt for: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User not found - ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log(`Login failed: Password mismatch for - ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`Login successful: ${email}`);
        const token = generateToken(user._id);
        res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email, role: user.role, branch: user.branch } });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
