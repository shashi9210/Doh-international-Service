const mongoose = require('mongoose');
const { User } = require('./src/models/Schemas');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/is-oms';

async function fixUser() {
    try {
        await mongoose.connect(MONGO_URI);

        // Fix the typo email
        const result = await User.updateOne(
            { email: 'sassy9558@gmil.com' },
            { $set: { email: 'sassy9558@gmail.com' } }
        );

        if (result.modifiedCount > 0) {
            console.log('✅ Fixed email typo: sassy9558@gmil.com -> sassy9558@gmail.com');
        } else {
            console.log('ℹ️ No user found with the typo email.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fixUser();
