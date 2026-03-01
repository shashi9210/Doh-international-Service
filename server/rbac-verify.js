const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testRBAC = async () => {
    console.log('🚀 Starting RBAC Security Verification...');

    try {
        // 1. Login as Agent
        console.log('\n--- Testing Agent (agent@it.com) ---');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'agent@it.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Try to get all users
        const usersRes = await axios.get(`${API_URL}/users`, config);
        console.log('Response structure:', JSON.stringify(usersRes.data, null, 2));

        const agentData = usersRes.data.data || usersRes.data; // Handle both structures
        const count = Array.isArray(agentData) ? agentData.length : usersRes.data.count;

        console.log(`Agent view count: ${count} (Expected: 1)`);
        if ((count === 1) || (Array.isArray(agentData) && agentData.length === 1)) {
            console.log('✅ Agent RBAC filtering PASS');
        } else {
            console.log('❌ Agent RBAC filtering FAIL');
        }

        // 2. Login as Supervisor
        console.log('\n--- Testing Supervisor (mike@it.com) ---');
        const superRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'mike@it.com',
            password: 'password123'
        });
        const superToken = superRes.data.token;
        const superConfig = { headers: { Authorization: `Bearer ${superToken}` } };

        const allUsersSuperRes = await axios.get(`${API_URL}/users`, superConfig);
        const superData = allUsersSuperRes.data.data || allUsersSuperRes.data;
        console.log(`Supervisor view count: ${Array.isArray(superData) ? superData.length : allUsersSuperRes.data.count}`);

        const dataArr = Array.isArray(superData) ? superData : superData; // Fallback
        const otherBranch = Array.isArray(dataArr) ? dataArr.find(u => u.branch !== 'IT') : null;

        if (!otherBranch) console.log('✅ Supervisor Branch Leak Check PASS');
        else console.log('❌ Supervisor Branch Leak Check FAIL');

        console.log('\n🌟 ALL RBAC TESTS COMPLETED 🌟');

    } catch (err) {
        console.error('❌ Test execution error:', err.response?.data || err.message);
    }
};

testRBAC();
