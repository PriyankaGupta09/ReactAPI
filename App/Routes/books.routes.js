const path = require('path');
const booksControllers = require(path.join(__dirname, '../controllers/books.controller'));
const jwtAuth = require(path.join(__dirname,'../middleware/authJWT'));


module.exports = app => {
    app.post("/api/books", jwtAuth , booksControllers.create);
    app.get("/api/books",  booksControllers.fetchAll);
    app.get("/api/books/:id", booksControllers.fetchOne);
    app.put("/api/books/:id", jwtAuth ,booksControllers.update);
    app.delete("/api/books/:id",jwtAuth , booksControllers.deleteOne);
    app.delete("/api/books",jwtAuth , booksControllers.deleteAll);
}