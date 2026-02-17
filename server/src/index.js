const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { apiLimiter } = require('./middleware/rateLimiter');

require('dotenv').config();

const app = express();

// Body Parsers
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow loading images from different origins (if needed)
}));
app.use(mongoSanitize()); // Prevent NoSQL Injection
app.use(xss()); // Prevent XSS

// CORS Configuration
app.use(cors({
    origin: '*', // Allow all for dev, restrict in prod
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting for API routes
app.use('/api', apiLimiter);

// Serve Static Files (Uploaded Photos)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/is-oms';

mongoose.connect('mongodb://127.0.0.1:27017/is-oms')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'IS-OMS API is running Securely' });
});

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
// app.use('/api/it', require('./routes/it'));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
