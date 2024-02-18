const express = require('express');
const app = express.Router();
const Interview = require('../models/Interview/Interview');

app.post('/create', async (req, res) => {
    try {
        const newPost = new Interview(req.body);
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) { // Corrected 'erroe' to 'error' here
        res.json({ message: error.message });
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
