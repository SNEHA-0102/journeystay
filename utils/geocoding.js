const axios = require('axios');

async function getCoordinates(address) {
    try {
        const response = await axios.get('https://us1.locationiq.com/v1/search', {
            params: {
                key: process.env.MAP_TOKEN,
                q: address,
                format: 'json'
            }
        });

        if (response.data && response.data.length > 0) {
            return [
                parseFloat(response.data[0].lon), 
                parseFloat(response.data[0].lat)
            ];
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

module.exports = { getCoordinates };