const mongoose = require("mongoose");

// Define pythonDetails schema
const pythonDetailsSchema = new mongoose.Schema({
    title: String,
    content: String,
    photourl: String,
    date: String,
});

// Define pythonSchema using pythonDetailsSchema
const pythonSchema = new mongoose.Schema({
    pychild: String,
    pydetails: [pythonDetailsSchema]
});

// Define language schema using pythonSchema
const languageSchema = new mongoose.Schema({
    title: String,
    intro: String,
    details: [pythonSchema]
});

// Create model from language schema
const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
