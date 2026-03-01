const mongoose = require('mongoose');
const User = require('./src/models/User');

const verify = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/is-oms');
        console.log('✅ Connected to MongoDB');

        const users = await User.find({});
        console.log(`Total users in DB: ${users.length}`);

        if (users.length < 1) {
            console.log('⚠️ No users found to test with.');
            process.exit(0);
        }

        const branches = ['IT', 'DOH RX', 'DOH ASSIST', 'DOH SHIELD'];
        for (const branch of branches) {
            const count = await User.countDocuments({ branch });
            console.log(`Branch ${branch}: ${count} users`);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();
