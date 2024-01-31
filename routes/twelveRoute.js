const express = require('express');
const app = express.Router();
const FirstUnite = require('../models/Twelve/FirstUnite');


app.get('/read', async (req, res) => {
    try {
        const users = await FirstUnite.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create', async (req, res) => {
    try {
        const newPost = new FirstUnite(req.body);
        const savePost = await newPost.save();
        res.json(savePost);

    } catch (error) {
        res.json({ message: error.message });


    }
})

module.exports = app;