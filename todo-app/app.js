/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { request, response } = require("express");
const express = require("express");
const app = express();
const { Todo } = require("./models");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// eslint-disable-next-line no-unused-vars

app.set("view engine", "ejs");
app.get("/", async (request, response) => {
  const todoList = await Todo.getTodos();
  if (request.accepts("html")) {
    response.render("index", {
      todoList,
    });
  } else {
    response.json({ todoList });
  }
});
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async (request, response) => {
  try {
    const todoList = await Todo.findAll();
    return response.json(todoList);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (request, response) => {
  console.log("Creating a todo", request.body);
  try {
    const todoItem = await Todo.build({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    }).save();
    return response.json(todoItem);
  } catch (error) {
    console.log(error);
    console.log("Validation error:", error);
    return response.status(427).json(error);
  }
});

// PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (request, response) => {
  console.log("Updating a todo item with id :", request.params.id);
  const todoItem = await Todo.findByPk(request.params.id);
  try {
    const update = await todoItem.markAsCompleted();
    return response.json(update);
  } catch (error) {
    console.log(error);
    return response.status(427).json(error);
  }
});

// eslint-disable-next-line no-unused-vars
app.delete("/todos/:id", async (request, response) => {
  console.log("Deleting a todo with id : ", request.params.id);
  try {
    const resultItem = await Todo.destroy({
      where: { id: request.params.id },
    });
    return response.json(resultItem > 0);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = app;
