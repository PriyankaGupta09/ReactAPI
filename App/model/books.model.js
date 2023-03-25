
const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    published: Boolean,
    price: Number
  });

const booksModel = mongoose.model("books", booksSchema);

module.exports= booksModel;