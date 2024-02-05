const express = require('express');
const axios = require('axios');
const app = express.Router();

// Endpoint to execute code on JDoodle
app.post('/execute', async (req, res) => {
    try {
        // Replace 'YOUR_CLIENT_ID' and 'YOUR_CLIENT_SECRET' with your JDoodle API credentials
        const clientId = '2aa1069d39703ac85ad443a5d58de66d';
        const clientSecret = '9b5ef95ed92b8e2989615d0b76bbcdacf59e4f1d21e8a55a655ed7702d75b119';

        // Extract code and language from the request body
        const { code, language } = req.body;

        // Make a request to JDoodle's "Execute Code" API
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            clientId,
            clientSecret,
            script: code,
            language,
            versionIndex: '0' // You        x can adjust this based on the language
        });

        // Return the JDoodle response to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;