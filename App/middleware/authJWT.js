const path = require('path');
const jwt = require("jsonwebtoken");
const userModel = require(path.join(__dirname, "../model/users.model"))

const verifyToken = (req, res, next) => {

    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET , function (err, verifiedToken){

            if (err){
                res.status(403).send({message: "Invalid JWT token"})
            }

            userModel.findById(verifiedToken.id)
            .then(user =>{
                req.user = user;

                console.log("user", user);
                next();
            })
            .catch(err =>{
                res.status(500).send({message:err.message})
            })
        })
    }
    else{
        res.status(403).send({message:"Token not present"})
        next();
    }
}

module.exports = verifyToken;