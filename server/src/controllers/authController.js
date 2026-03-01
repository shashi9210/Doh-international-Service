const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateEmployeeId = require('../utils/generateId');

// Generate Access Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1d'
    });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d'
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
    try {
        let { firstName, lastName, phone, email, password, confirmPassword, role, post, branch, dateOfJoining } = req.body;

        // Validation for enterprise security
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        email = email.toLowerCase().trim();

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Generate Employee ID using architect-approved utility
        const employeeId = generateEmployeeId(branch);

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

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set refresh token in httpOnly cookie (Security Best Practice)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log('--- User Registered Successfully ---');
        console.log('User ID:', user._id);
        console.log('Employee ID:', user.employeeId);

        res.status(201).json({
            success: true,
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
        console.error('Registration error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * @desc    Login user & get tokens
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase().trim();

        // Find user & include password for identification (Security Enforcement)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password (bcrypt 12 rounds enforced in model)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set refresh token in httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
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
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Logout user / Clear session tokens
 * @route   GET /api/auth/logout
 * @access  Private
 */
exports.logout = async (req, res) => {
    // Clear the httpOnly cookie
    res.cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ success: true, message: 'User logged out successfully' });
};

/**
 * @desc    Refresh Access Token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User session expired' });
        }

        const newToken = generateToken(user._id);

        res.json({
            success: true,
            token: newToken
        });
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }
};
