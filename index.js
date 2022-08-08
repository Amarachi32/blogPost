const express = require("express");
const mongoose = require("mongoose");
const post = require("./models/posts.model");
const ejs = require("ejs");
require("dotenv").config();
const app = express();
port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))
mongoose
  .connect(process.env.DATABAESE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("mongodb connected");
  })
  .catch((error) => console.log("error"));
// mongoose.connect("mongodb://localhost:27017/blogpost").then(
// console.log('db connected'))
// () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
// err => { /** handle initial connection error */ }
//   );

app.get("/", async (req, res) => {
  const posts = await post
    .find({})
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { posts: result });
      
    })
    .catch((error) => console.log("error"));
});
// read more button
app.get("/post/store/:id", async(req, res) => {
  const id = req.params.id;
  await post.findById(id)
  .then((read) => {
    res.render("readone", { post: read });
    console.log(result)
  })
  .catch((error) => console.log("error"));

});


// to get publish page
app.get("/publish", (req, res) => {
  res.render("publish");
});

// to post blog to server through publish page "submit button"
app.post("/post/store", async (req, res) => {
  try {
    const posts = await post.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// update post with button update
app.get('/update_id/:id', async(req,res)=>{
  const id  = req.params.id
  await post.findById(id).then(result=>{
res.render('updatePage', {post: result})

  }).catch((error)=>
  console.log(error)
  )
})
// event after filling a form then submit to take action
app.post('/update_id/:id', async(req,res)=>{
  const id = req.params.id;
  await post.findByIdAndUpdate(id, req.body).then(result=>{
    res.redirect("/")
  }).catch((error)=>{
    console.log(error)
  })
})


// delete action
app.delete('/delete_post/:id', async(req,res)=>{
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
})


app.get("/readall", async (req, res) => {
  const posts = await post.find({});
  res.render("readall", { posts });
});

app.post("/readall/:human", async (req, res) => {
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

app.listen(port, () => {
  console.log("server listening on port 3000");
});
