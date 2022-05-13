const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String
});
const BlogPost = mongoose.model('BlogPosts',BlogPostSchema);
module.exports = BlogPost