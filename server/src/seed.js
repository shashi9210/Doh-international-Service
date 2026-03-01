const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/is-oms');
        console.log('✅ Connected to MongoDB');

        await User.deleteMany();
        console.log('🗑️ Database Cleared');

        const users = [
            {
                firstName: 'John',
                lastName: 'Founder',
                email: 'john@doh.com',
                password: 'password123',
                role: 'Admin',
                post: 'Co Founder',
                branch: 'IT',
                dateOfJoining: new Date(),
                employeeId: 'DOH-IT-2024-0001',
                phone: '1234567890'
            },
            {
                firstName: 'Sarah',
                lastName: 'HR',
                email: 'sarah@doh.com',
                password: 'password123',
                role: 'HR',
                post: 'HR Manager',
                branch: 'IT',
                dateOfJoining: new Date(),
                employeeId: 'DOH-HR-2024-0002',
                phone: '1234567891'
            },
            {
                firstName: 'Mike',
                lastName: 'IT-Super',
                email: 'mike@it.com',
                password: 'password123',
                role: 'Manager',
                post: 'Supervisor',
                branch: 'IT',
                dateOfJoining: new Date(),
                employeeId: 'DOH-IT-2024-0003',
                phone: '1234567892'
            },
            {
                firstName: 'Emma',
                lastName: 'Rx-Super',
                email: 'emma@rx.com',
                password: 'password123',
                role: 'Manager',
                post: 'Supervisor',
                branch: 'DOH RX',
                dateOfJoining: new Date(),
                employeeId: 'DOH-RX-2024-0004',
                phone: '1234567893'
            },
            {
                firstName: 'Agent',
                lastName: 'Smith',
                email: 'agent@it.com',
                password: 'password123',
                role: 'Employee',
                post: 'Agent',
                branch: 'IT',
                dateOfJoining: new Date(),
                employeeId: 'DOH-IT-2024-0005',
                phone: '1234567894'
            }
        ];

        for (let u of users) {
            const user = new User(u);
            await user.save();
            console.log(`✅ Seeded: ${u.email} as ${u.post}`);
        }

        console.log('🚀 DB Seeding Complete');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seedUsers();
