const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        minlength: [2, 'First Name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true
    },
    // Auto-generated ID (e.g., DOH-IT-2024-001)
    employeeId: {
        type: String,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // Optimized query performance
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Never return password in queries by default
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Employee', 'HR'],
        default: 'Employee'
    },
    post: {
        type: String,
        enum: ['Co Founder', 'HR Manager', 'Supervisor', 'Agent'],
        required: [true, 'Post is required']
    },
    branch: {
        type: String,
        enum: ['IT', 'DOH RX', 'DOH ASSIST', 'DOH SHIELD'],
        required: [true, 'Branch is required']
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Date of Joining is required'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Date of Joining cannot be in the future'
        }
    },
    photo: {
        type: String, // Path to uploaded file
        default: 'default-avatar.png'
    },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
