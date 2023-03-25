const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    
    email : {
        type : String,
        lowercase : true,
        unique : [true, "Email already exists"],
        required : true
    },

    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin", "normal"]
    }
  });

const usersModel = mongoose.model("users", usersSchema);

module.exports= usersModel;