const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

// const { col } = require("sequelize");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let user = models.User;
let task = models.Task;

app.get("/health", (req, res) => {
  res.send("Serv rodando");
});

app.post("/login", async (req, res) => {
  // console.log(req);
  // console.log(res);
  let response = await user.findOne({
    where: { login: req.body.login, password: req.body.password },
  });
  // console.log(response);
  if (response === null) {
    res.send(JSON.stringify("error"));
  } else {
    res.send(response);
  }
});

app.post("/createTask", async (req, res) => {
  let createTask = await task.create({
    iduser: req.body.iduser,
    description: req.body.description,
    completed: 0,
    taskdate: '2022-12-01',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send("Registro criado com sucesso!");
  // console.log(req.body);

});

app.get("/read", async (req, res) => {
  let read = await user.findAll({
    raw: true,
  });
  res.send(read);

  // console.log(read);
});

app.get("/readTasks", async (req, res) => {
  let readTasks = await task.findAll({
    where: {
      idUser: 1,
    },
  });
  res.send(readTasks);

  // console.log(readTasks);
});

// app.get("/update", async (req, res) => {
//   let update = await user.findByPk(2).then((response) => {
//     response.login = "Phelipe";
//     response.password = "12345678";
//     response.email = "Phelipe@gamil";
//     response.save();
//   });
//   res.send("Usuario editado com sucesso!");
// });

app.post("/updateTaskDescription", async (req, res) => {  
  let updateTask = await task.findByPk(req.body.id).then((response) => {
    response.description = req.body.description
    response.save();
  });
  res.send("Registro editado com sucesso!");
});


app.post("/updateTaskCompleted", async (req, res) => {  
  let updateTask = await task.findByPk(req.body.id).then((response) => {

    if (response.completed == true){
      response.completed = false;
    } else {
      response.completed = true;
    }    
    response.save();
  });
  res.send("Registro editado com sucesso!");
});


app.post("/deleteTask/", async (req, res) => {

  let deleteTask = await task.destroy({
    where: {
      id: req.body.id,
    },
  });
  res.send(deleteTask);
  console.log(req.body);
  // res.send("Registro deletado com sucesso!");
});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  // console.log("rodando");
  ("up");
});
