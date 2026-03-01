const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

async function testRegister() {
    const formData = new FormData();
    formData.append('firstName', 'Test');
    formData.append('lastName', 'User');
    formData.append('phone', '1234567890');
    formData.append('email', `test_${Date.now()}@example.com`);
    formData.append('password', 'Password123!');
    formData.append('confirmPassword', 'Password123!');
    formData.append('role', 'Employee');
    formData.append('post', 'Agent');
    formData.append('branch', 'IT');
    formData.append('dateOfJoining', '2024-01-01');

    // Create a dummy file for the photo if needed, but let's see if it works without it first
    // Actually the middleware uses upload.single('photo'), so it might be required.
    // Let's create a small text file and rename it to .jpg for testing.
    const dummyPhotoPath = path.join(__dirname, 'dummy.jpg');
    fs.writeFileSync(dummyPhotoPath, 'dummy content');
    formData.append('photo', fs.createReadStream(dummyPhotoPath));

    try {
        const response = await axios.post('http://127.0.0.1:5000/api/auth/register', formData, {
            headers: formData.getHeaders()
        });
        console.log('Registration Success:', response.data);
    } catch (error) {
        console.error('Registration Failed:', error.response ? error.response.data : error.message);
    } finally {
        if (fs.existsSync(dummyPhotoPath)) {
            fs.unlinkSync(dummyPhotoPath);
        }
    }
}

testRegister();
