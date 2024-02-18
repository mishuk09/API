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

// Fetch blog posts by category
app.get('/readByCategory', async (req, res) => {
    const category = req.query.category;

    try {
        const blogs = await BlogPost.find({ category: category });
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Fetch blog posts by category
// router.get('/readByCategory', async (req, res) => {
//     const category = req.query.category;
//     try {
//         const blogs = await BlogPost.find({ category: category });
//         res.json(blogs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.get('/categories', async (req, res) => {
//     try {
//         const categories = await BlogPost.distinct('category');
//         res.json(categories);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Inside your server-side route
app.get('/categoriesWithCount', async (req, res) => {
    try {
        const categoriesWithCount = await BlogPost.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: 1
                }
            }
        ]);
        res.json(categoriesWithCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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


app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Inside your server-side route
app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    try {
        const result = await BlogPost.find({ title: { $regex: query, $options: 'i' } });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = app;
