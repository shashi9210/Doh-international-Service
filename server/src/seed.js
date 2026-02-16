const mongoose = require('mongoose');
const { User } = require('./models/Schemas');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/is-oms');

        // Check if admin exists
        const admin = await User.findOne({ email: 'admin@is-oms.com' });
        if (!admin) {
            const newAdmin = new User({
                name: 'Super Admin',
                email: 'admin@is-oms.com',
                password: 'adminpassword123',
                role: 'Admin',
                branch: 'Management'
            });
            await newAdmin.save();
            console.log('✅ Admin user created: admin@is-oms.com / adminpassword123');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        process.exit();
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
};

seedAdmin();
