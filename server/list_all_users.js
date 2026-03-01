const mongoose = require('mongoose');
const User = require('./src/models/User');

const listUsers = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/is-oms');
        console.log('✅ Connected to MongoDB');

        const users = await User.find({});
        console.log(`--- Total Users: ${users.length} ---`);

        users.forEach(u => {
            console.log(`[${u.firstName} ${u.lastName}] - Branch: '${u.branch}' - Post: '${u.post}'`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

listUsers();
