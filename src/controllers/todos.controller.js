const db = require("../models");
const Todo = db.todo;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const User = db.user;
const config = require("../config/auth.config.js");

// Add new Todo
exports.create = (req, res) => {
  console.log("Request body:", req.body); 

  if (!req.body || !req.body.title) {
    res.status(400).send({
      message: "Title is required.",
    });
    return;
  }

  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    console.log("Decoded JWT payload:", decoded);


    const userId = decoded.id;
    
 
    User.findOne({ where: { id: userId } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        const todo = {
          title: req.body.title,
          description: req.body.description || "", 
          status: req.body.status || false, 
          username: user.username, 
        };

        Todo.create(todo)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the todo.",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving user: " + err.message,
        });
      });
  });
};

// Show All Todos
exports.findAll = (req, res) => {

  Todo.findAll()
    .then((data) => {
      if (data.length === 0) {

        res.status(404).send({
          message: "No todos found.",
        });
      } else {
 
        res.send({message:"yeyyy todos foundd",data:data});
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Show Todo by Id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({message:"Yeyy todo found",data:data});
      } else {
        res.status(404).send({
          message: `Cannot find todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving todo with id=" + id,
      });
    });
};

// Update Todo
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "todo was updated successfully.",
          data:data
        });
      } else {
        res.send({
          message: `Cannot update todo with id=${id}. Maybe todo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating todo with id=" + id,
      });
    });
};

// Delete Todo
exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (data == 1) {
        res.send({
          message: "todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete todo with id=${id}. Maybe todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete todo with id=" + id,
      });
    });
};


// Show List todo based on username
exports.findTodobyUser = (req, res) => {
  const username = req.body.username; 

  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      Todo.findAll({ where: { username: user.username } })
        .then((data) => {
          if (data.length > 0) {
            const todos = data.map((todo) => ({
              title: todo.title,
              description: todo.description,
              status: todo.status === 1 ? "completed" : "incomplete",
            }));
            res.send(todos);
          } else {
            res.status(404).send({ message: "No todos found for the user" });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving todos: " + err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user: " + err.message,
      });
    });
};


// Delete aLL
exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} todos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all todos.",
      });
    });
};

// 
exports.findAllStatus = (req, res) => {
  Todo.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};