// models/User.js
const mongoose = require('mongoose');

const uniteSchema = new mongoose.Schema({
    title: String,
    content: String,
    photourl: String,
    date: String,
    category: String,
});

const FirstUnite = mongoose.model('FirstUnite', uniteSchema);

module.exports = FirstUnite;
