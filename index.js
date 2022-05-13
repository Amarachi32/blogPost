const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})
// const path = require('path')
// const ejs = require('ejs')
const ejs = require('ejs')
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')
app.set('view engine', 'ejs')

// app.get('/', (req,res)=> {
//     res.send('hello world')
// })s
// app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))
app.get('/', async(req,res)=>{
    const blogposts = await BlogPost.find({})
    // res.sendFile(path.resolve(__dirname, 'views/index.html'))
    res.render('index', {blogposts})
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.get('/post',(req,res)=>{
    res.render('post')
})
app.get('/posts/new',(req,res)=>{
    res.render('create')
})


app.post('/posts/store',(req,res)=>{
    console.log(req.body)
    res.redirect('/')
})

// app.post('/posts/store',(req,res)=>{
//     // model creates a new doc with browser data
//     BlogPost.create(req.body,(error,BloPost) =>{
//     res.redirect('/')
//  })
// })

app.post('posts/store', async(req,res)=>{
    await BlogPost.create(req.body)
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log('listening to server')
})

