const mongoose = require('mongoose')
const schema = mongoose.Schema
const postSchema = new schema({
title:{
    type:String,
    required:true
},
caption:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},

},
{timestamps:true}
);

const post = mongoose.model('post', postSchema)
module.exports = post

