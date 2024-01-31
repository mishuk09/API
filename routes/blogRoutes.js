// routes/blogRoutes.js
const express = require('express');
const app = express.Router();
const BlogPost = require('../models/BlogPost');

// Create a new blog post
app.post('/create', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Get all blog posts
app.get('/read', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        res.json({ message: error.message });
    }
});

//Count Blog

app.get('/count', async (req, res) => {
    try {
        const count = await BlogPost.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error getting blog post count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//END point for gatting onedoc by ID

app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await BlogPost.findById(id);

        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//API for next and previous page....

app.get('/blog/blogs/:blogid', async (req, res) => {
    const blogId = req.params.blogid;

    try {
        const blog = await BlogPost.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const sortedBlogs = await BlogPost.find().sort({ date: 'asc' }); // Assuming you have a date or some other field for sorting

        const currentIndex = sortedBlogs.findIndex(blog => blog._id.toString() === blogId);
        const prevBlogId = currentIndex > 0 ? sortedBlogs[currentIndex - 1]._id.toString() : null;
        const nextBlogId = currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1]._id.toString() : null;

        const blogWithNavigation = {
            ...blog.toObject(),
            prevBlogId,
            nextBlogId
        };

        res.json(blogWithNavigation);
    } catch (error) {
        console.error('Error fetching blog details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add this route to fetch blog posts by category
app.get('/readByCategory', async (req, res) => {
    const category = req.query.category; // Retrieve category from query parameters
    
    try {
        const result = await BlogPost.find({ category });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Update a blog post
app.patch('/update/:id', async (req, res) => {
    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Delete a blog post
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        res.json(deletedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = app;
