const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
BlogPost.create({
title: 'The Mythbuster Guide to Saving Money on Energy Bills',
body: 'If you have been here a long time, you might remember when I went on ITV Tonight to this:',

  }, (error, blogpost) =>{
console.log(error,blogpost)
})