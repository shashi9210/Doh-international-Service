const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Employee'], default: 'Employee' },
    branch: { type: String, enum: ['IT', 'Rx', 'Assist', 'Shield', 'Management'], required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// IT Project Schema
const ITProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    deadline: Date
});

// Doh Rx Inventory Schema
const RxInventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    category: String,
    price: Number
});

// Doh Assist Ticket Schema
const AssistTicketSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
    slaDeadline: Date
});

// Doh Shield Incident Schema
const ShieldIncidentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    location: String,
    description: String,
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    ITProject: mongoose.model('ITProject', ITProjectSchema),
    RxInventory: mongoose.model('RxInventory', RxInventorySchema),
    AssistTicket: mongoose.model('AssistTicket', AssistTicketSchema),
    ShieldIncident: mongoose.model('ShieldIncident', ShieldIncidentSchema)
};
