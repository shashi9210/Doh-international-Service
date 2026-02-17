const loginAndFetch = async () => {
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'shashiprakash955@gmail.com',
                password: 'Shashi@9558'
            })
        });

        const loginData = await loginRes.json();
        const token = loginData.token;

        if (!token) return;

        const usersRes = await fetch('http://localhost:5000/api/users?branch=DOH SHIELD', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const usersData = await usersRes.json();
        if (usersData.length > 0) {
            const user = usersData[0];
            console.log('User Found:', user.firstName);
            console.log('Date of Joining:', user.dateOfJoining);
            // Ensure password is NOT present
            console.log('Password Present:', 'password' in user);
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
};

loginAndFetch();
