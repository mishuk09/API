const mongoose = require('mongoose');

const imgPostSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
});

const ImgPost = mongoose.model('ImgPost', imgPostSchema);

module.exports = ImgPost;