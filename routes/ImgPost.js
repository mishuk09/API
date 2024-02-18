const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const ImgPost = require('../models/ImgPost/ImgPost');
const fs = require('fs');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/addimg', upload.single('image'), async (req, res) => {
    try {
        const newImg = new ImgPost({
            name: req.body.name,
            data: req.file.buffer, // Access file buffer provided by multer
        });
        const savedImg = await newImg.save();
        res.json(savedImg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/getimg', async (req, res) => {
    try {
        const img = await ImgPost.find();
        res.json(img);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = app;
