// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({

    title: String,
    content: String,
    photourl: String,
    date: String,
    category: String,
    // Add other fields like author, date, etc. as needed
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
