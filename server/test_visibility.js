const verifyVisibility = async () => {
    try {
        // 1. Login with a known user (from IT)
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'agent@it.com',
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        if (!loginData.success) {
            console.error('Login failed:', loginData.message);
            return;
        }

        const token = loginData.token;
        console.log(`✅ Logged in as: ${loginData.user.firstName} (Branch: ${loginData.user.branch})`);

        // 2. Attempt to fetch users from a DIFFERENT branch (DOH RX)
        const targetBranch = 'DOH RX';
        const encodedBranch = encodeURIComponent(targetBranch);
        const usersRes = await fetch(`http://localhost:5000/api/users/branch/${encodedBranch}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const usersData = await usersRes.json();
        console.log(`📡 Fetching ${targetBranch} branch members...`);

        if (usersData.success) {
            console.log(`✅ Success! Found ${usersData.count} members in ${targetBranch}.`);
            if (usersData.count > 0) {
                console.log(`👤 Sample Member: ${usersData.data[0].firstName} ${usersData.data[0].lastName}`);
            }
        } else {
            console.log(`❌ Failed to fetch: ${usersData.message}`);
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
};

verifyVisibility();
