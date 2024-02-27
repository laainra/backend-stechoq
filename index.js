const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const todoRoutes = require("./src/routes/todo.routes");
const authRoutes = require("./src/routes/auth.routes");


app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Laila's To Do List application." });
});

todoRoutes(app);
authRoutes(app);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized.");
  initial();
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;

function initial() {
  Role.findOrCreate({
    where: { id: 1 },
    defaults: { name: "user" }
  });

  Role.findOrCreate({
    where: { id: 2 },
    defaults: { name: "admin" }
  });
}
