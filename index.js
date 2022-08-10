const express = require("express");
const mongoose = require("mongoose");
const post = require("./models/posts.model");
const ejs = require("ejs");
require("dotenv").config();
const app = express();
const { postRouter } = require("./routes/postRoutes")
const { mainRouter } = require("./routes/mainRoutes")

port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/posts", postRouter)
app.use( mainRouter)
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

// read more button



app.listen(port, () => {
  console.log("server listening on port 3000");
});
