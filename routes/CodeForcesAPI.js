const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '5dd93b75de1c47a22658952b98f72e0f0a058fe1';
const API_SECRET = 'ece7bda0e937018e360e44577d8c5221e48a72cd';


app.get('/problems', async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/problemset.problems');
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;
