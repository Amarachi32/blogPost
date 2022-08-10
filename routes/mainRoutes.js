const express = require('express')
const post = require('../models/posts.model')
const mainRouter = express.Router()

    mainRouter.get("/", async (req, res) => {
    const posts = await post
      .find({})
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { posts: result });
        
      })
      .catch((error) => console.log("error"));
  });
  
 mainRouter.get("/about", (req, res) => {
    res.render("about");
  });
  
  mainRouter.all('*', (req,res)=>{
    res.status(404).render('404')
  })

  module.exports = { mainRouter }