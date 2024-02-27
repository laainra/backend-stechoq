const jwt = require('jsonwebtoken');
const authJwt = require('../middleware/authJwt.js');

module.exports = app => {
    const todos = require("../controllers/todos.controller.js");
  
    var router = require("express").Router();

    router.post("/", authJwt.verifyToken, todos.create);
    router.get("/", authJwt.verifyToken, todos.findAll);
    router.get("/status", authJwt.verifyToken, todos.findAllStatus);
    router.get("/:id", authJwt.verifyToken, todos.findOne);
    router.post("/find", authJwt.verifyToken, todos.findTodobyUser);
    router.put("/:id", authJwt.verifyToken, todos.update);
    router.delete("/:id", authJwt.verifyToken, todos.delete);
    router.delete("/", authJwt.verifyToken, todos.deleteAll);
  
    app.use('/api/todos', router);
};
