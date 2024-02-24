const express = require('express');
const app = express.Router();
const language = require('../models/Language/Language');


app.post('/create', async (req, res) => {
    try {
        const newPost = new language(req.body);
        const savePost = await newPost.save();
        res.json(savePost);

    } catch (error) {
        res.json({ message: error.message });
    }
});
app.get('/read', async (req, res) => {
    try {
        const languageFetch = await language.find();
        res.json(languageFetch);

    } catch (error) {
        res.json({ message: error.message });
    }

})
module.exports = app;