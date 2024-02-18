const mongoose = require('mongoose');

// Define link schema
const linkSchema = new mongoose.Schema({
    text: String
});

// Define child object schema
const childObjectSchema = new mongoose.Schema({
    id: Number,
    title: String,
    links: [linkSchema] // Reference to link schema
});

// Define interview schema
const interviewSchema = new mongoose.Schema({
    title: String,
    content: String,
    photourl: String,
    pdf: String,
    date: String,
    childObjects: [childObjectSchema]
});

// Create Interview model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
