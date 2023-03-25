const path = require('path');
const usersControllers = require(path.join(__dirname,'../controllers/users.controller'));


module.exports = app => {
    app.post("/api/register", usersControllers.register);
    app.post("/api/login", usersControllers.login);
}