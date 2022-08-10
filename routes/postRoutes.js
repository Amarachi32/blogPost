const express = require('express')
const post = require('../models/posts.model')
const postRouter = express.Router()
const { getNewPost,publishNew, postBlog, getOnePost, updatePost, deletePost } = require('../controllers/postControllers')


// for crud operations

postRouter.get("/store/:id", getNewPost);
  
  
  // to get publish page
  postRouter.get("/publish", publishNew);
 
  
  // to post blog to server through publish page "submit button"
  postRouter.post("/posts/store", postBlog);
  
  // update post with button update
  postRouter.get('/update_id/:id', getOnePost)
  // event after filling a form then submit to take action
  postRouter.post('/update_id/:id', updatePost)
  
  
  // delete action
  postRouter.delete('/delete_post/:id', deletePost)
  
  
  postRouter.get("/readall", async (req, res) => {
    const posts = await post.find({});
    res.render("readall", { posts });
  });
  
  postRouter.post("/readall/:human", async (req, res) => {
    const posts = await post.find({
      "&or": [{ title: { $regex: req.query.human } }],
    });
    res.render("readone", { posts });
  });
  
  
  // app.get('/readall', async(req,res)=>{
  //     const searchField = req.query.searchField
  //     const posts = await post.find({
  //         "&or":[
  //             {title:{$regex:searchField, $options:'$i'}}
  //         ]
  //     }).then(data=>{
  //         res.send(data)
  //     })
  //     res.render('readall', {posts})
  
  //    })
  
  module.exports = { postRouter };