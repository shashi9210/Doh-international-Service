const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://127.0.0.1:27017/is-oms';
const UPLOADS_DIR = path.join(__dirname, 'public/uploads');

const cleanup = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected.');

        // 1. Delete all users
        const User = mongoose.model('User', new mongoose.Schema({}));
        const userResult = await User.deleteMany({});
        console.log(`✅ Deleted ${userResult.deletedCount} users from MongoDB.`);

        // 2. Clear upload folder
        console.log('🔄 Cleaning up uploads directory...');
        if (fs.existsSync(UPLOADS_DIR)) {
            const files = fs.readdirSync(UPLOADS_DIR);
            let deletedFiles = 0;
            files.forEach(file => {
                if (file.startsWith('photo-')) {
                    fs.unlinkSync(path.join(UPLOADS_DIR, file));
                    deletedFiles++;
                }
            });
            console.log(`✅ Deleted ${deletedFiles} photos from server.`);
        } else {
            console.log('⚠️ Uploads directory not found.');
        }

        console.log('🎉 Cleanup complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during cleanup:', err.message);
        process.exit(1);
    }
};

cleanup();
