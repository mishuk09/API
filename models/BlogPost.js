// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({

    title: String,
    content: String,
    photourl: String,
    date: String,
    category: String,
    
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
