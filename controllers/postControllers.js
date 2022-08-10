// const express = require('express')
const post = require('../models/posts.model')
// const { getNewPost } = express.Router()

const getNewPost = async(req, res) => {
    const id = req.params.id;
    await post.findById(id)
    .then((read) => {
      res.render("readone", { post: read });
      console.log(result)
    })
    .catch((error) => console.log("error"));
  
}
const publishNew = (req, res) => {
    res.render("publish");
  }
const postBlog = async (req, res) => {
    try {
      const posts = await post.create(req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

const getOnePost = async(req,res)=>{
    const id  = req.params.id
    await post.findById(id).then(result=>{
  res.render('updatePage', {post: result})
  
    }).catch((error)=>
    console.log(error)
    )
  }

const updatePost = async(req,res)=>{
    const id = req.params.id;
    await post.findByIdAndUpdate(id, req.body).then(result=>{
      res.redirect("/")
    }).catch((error)=>{
      console.log(error)
    })
  }

const deletePost = async(req,res)=>{
    const id = req.params.id
    await post.findByIdAndDelete(id).then(result=>{
      res.json({
        status:true,
        message:"post deleted", 
        redirect:"/"
      })
    }).catch((error)=>{
      res.json({
        status:false,
        message:"cannot delete"
      })
    })
  }

module.exports = {
    getNewPost, publishNew, postBlog, getOnePost, updatePost, deletePost
}