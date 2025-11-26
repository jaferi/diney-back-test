const axios = require('axios');
const BASE_URL = 'http://localhost:3001/api/properties';

async function testAPIs() {
    try {
        // 1. Create property
        let res = await axios.post(BASE_URL, {
            userId: '1',
            userName: 'Alice',
            title: 'House',
            address: '123 St',
            price: 100000,
            note: 'Nice house'
        });
        console.log('Create:', res.data);

        const propertyId = res.data.id;

        // 2. Get all properties
        res = await axios.get(BASE_URL);
        console.log('All properties:', res.data);

        // 3. Update property
        res = await axios.put(`${BASE_URL}/${propertyId}`, {
            title: 'Updated House',
            price: 150000
        });
        console.log('Update:', res.data);

        // 4. Get by ID
        res = await axios.get(`${BASE_URL}/${propertyId}`);
        console.log('Get by ID:', res.data);

        // 5. Delete property
        res = await axios.delete(`${BASE_URL}/${propertyId}`);
        console.log('Delete:', res.data);

        // 6. Get all properties after deletion
        res = await axios.get(BASE_URL);
        console.log('All properties after deletion:', res.data);

    } catch (err) {
        if (err.response) {
            console.error('Error:', err.response.status, err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}

testAPIs().then();
