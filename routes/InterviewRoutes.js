
const express = require('express');
const app = express.Router();
const Interview = require('../models/Interview/Interview');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pdf');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST endpoint to create a new interview with PDF upload
app.post('/create', upload.single('pdf'), async (req, res) => {
    try {
        const { title, content, photourl, date, childObjects } = req.body;

        const pdfFileName = req.file ? req.file.filename : null;

        const newInterview = new Interview({
            title,
            content,
            photourl,
            pdf: pdfFileName, // Assign the filename to the 'pdf' field
            date,
            childObjects
        });

        // Save the new interview document to the database
        const savedInterview = await newInterview.save();
        res.json(savedInterview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/get', async (req, res) => {
    try {
        const interview = await Interview.find();
        res.json(interview);
    } catch (error) {
        res.json({ message: error.message }); 
    }
});

app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Interview.find({ title: { $regex: query, $options: 'i' } });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
});
app.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const interview = await Interview.findById(id);
        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }
        res.json(interview);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const updatedPost = await Interview.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const deleteInterview = await Interview.findByIdAndDelete(req.params.id);
        res.json(deleteInterview);
    } catch (error) {
        res.json({ message: error.message });
    }
});


module.exports = app;
