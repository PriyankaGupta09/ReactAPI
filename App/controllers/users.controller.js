const path = require('path');
const usersModel = require(path.join(__dirname,'../model/users.model'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.register = (req,res) => {
    //console.log("req", req);
    const {fullName, email, password, role} = req.body;

    const user = new usersModel ({fullName, email, password: bcrypt.hashSync(password, 10), role});

    user.save()
    .then(data =>{
        //console.log(data);
        res.send({message : "User Registeres Successfully"})
    })
    .catch(err => {
        res.status(500).send({message : err.message || "something went wrong"})
    })
}

exports.login = (req,res) =>{
     const {email, password} = req.body;

     usersModel.findOne({email : email})
     .then(data =>{
        if(!data){
            res.status(404).send({message: "email not found"})
        }
        //if email found compare password
        var isPasswordValid = bcrypt.compareSync(password, data.password);

        if(!isPasswordValid){
            res.status(401).send({message: "Invalid Password"})
        }

        var token = jwt.sign({id: data._id}, process.env.SECRET);

        res.send({
            user : {
                id : data._id,
                email : data.email,
                fullName : data.fullName,
                role : data.role
            },
            accessToken : token
        })

    })
     .catch(err =>{
        res.status(500).send({message: err.message})
     })
}
