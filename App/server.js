var express= require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



//var random = require("random");

// mongoose.connect('mongodb+srv://Priyanka09:Priya@cluster0.lk0angb.mongodb.net/?retryWrites=true&w=majority') //using url directly

const path = require('path');

const dbconfigs = require(path.join(__dirname, './config/db.config'));  //using connection from db.config
mongoose.connect(dbconfigs.url)

var db = mongoose.connection;

db.on('error',()=>{
    console.log("Unable to connect to database");
})

db.once('open', ()=>{
    console.log("Connection is successful");
})


var app = express()

app.use(cors());

app.listen(process.env.PORT, ()=> {
    console.log(`Your Server is Running On Port Number ${process.env.PORT}`);
})

app.use(bodyParser.json());

require('./Routes/books.routes')(app)
require('./Routes/users.routes')(app)



const blogSchema = mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number
    }
  });

  const Blog = mongoose.model('Blog', blogSchema);

  //POST- Create a blog - /api/blogs

  app.post("/api/blogs",(req,res)=>{

    const {title, author, body, comments, meta} = req.body;

    const newBlog = new Blog({title, author, body, comments, meta});

    newBlog.save()
    .then(data => {
        if(!data){
            res.status(400).send({message:"Something went wrong"});
        }
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({message:"Server not Available"});
    })
  })

  // GET --get data from database

  app.get("/api/blogs", (req,res)=>{
    Blog.find()
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Something went wrong"})
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err})
    })
  })

// GET -- find by id

app.get("/api/blogs/:id", (req,res)=>{
    const _id = req.params.id
    Blog.find({_id})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Something went wrong"})
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err})
    })
})

//PUT -- Update 

app.put("/api/blogs/:id", (req,res)=>{
    const _id = req.params.id;
    Blog.findByIdAndUpdate(_id, { author: "Virat"}, {})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Something went wrong"})
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err})
    })
})

//DELETE 

app.delete("/api/blogs/:id", (req,res)=>{
    const _id = req.params.id;
    Blog.findByIdAndRemove(_id, {})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Something went wrong"})
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err})
    })
})
