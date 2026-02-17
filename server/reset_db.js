const mongoose = require('mongoose');
const User = require('./src/models/User');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const resetDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/is-oms');
        console.log('✅ MongoDB Connected');

        // Delete all users
        const result = await User.deleteMany({});
        console.log(`🗑️  Deleted ${result.deletedCount} users.`);

        // Optional: Clean uploads folder
        const uploadDir = path.join(__dirname, 'public/uploads');
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir);
            for (const file of files) {
                if (file !== 'default-avatar.png') {
                    fs.unlinkSync(path.join(uploadDir, file));
                }
            }
            console.log(`🧹 Cleaned ${files.length} files from uploads.`);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetDb();
