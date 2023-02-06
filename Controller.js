const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

// const { col } = require("sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let user = models.User;
let task = models.Task;

app.get("/health", (req, res) => {
  res.send("Serv rodando");
});

app.post("/login", async (req, res) => {
  let response = await user.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  if (response === null) {
    res.send(JSON.stringify("error"));
  } else {
    res.send(response);
  }
});

app.post("/loginGoogle", async (req, res) => {
  let response = await user.findOne({
    where: { idGoogle: req.body.idGoogle },
  });
  if (response === null) {
    // res.send(JSON.stringify("salvar dados do google"));
    // Não tem cad google no banco
    let createUserGoogle = await user.create({
      idGoogle: req.body.idGoogle,
      login: req.body.nameGoogle,
      firstName: req.body.given_nameGoogle,
      lastName: req.body.family_nameGoogle,
      email: req.body.emailGoogle,
      picture: req.body.pictureGoogle,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.send(createUserGoogle);
    // console.log(req.body);
  } else {
    res.send(response);
    console.log(response);
    console.log('ja tem cad google pode entrar');

  }
});

app.post("/createUser", async (req, res) => {
  let searchLogin = await user.findOne({
    where: { login: req.body.login },
  });

  console.log(searchLogin);

  if (searchLogin != "") {
    console.log("Ja existe Usuario com esse login");
    res.send("error");
  } else {
    let createUser = await user.create({
      login: req.body.login,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.send(createUser);
    console.log(req.body);
  }
});

app.post("/createTask", async (req, res) => {
  let createTask = await task.create({
    iduser: req.body.iduser,
    description: req.body.description,
    completed: 0,
    taskdate: req.body.taskdate,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.send(createTask);
  console.log(req.body);
});

app.get("/read", async (req, res) => {
  let read = await user.findAll({
    raw: true,
  });
  res.send(read);
  // console.log(read);
});

app.get("/readTasks/:iduser/:taskdate", async (req, res) => {
  let readTasks = await task.findAll({
    where: {
      idUser: req.params.iduser,
      taskdate: req.params.taskdate,
    },
  });
  res.send(readTasks);
  // console.log(readTasks);
  // console.log(req.params);
});

app.post("/updateTaskDescription", async (req, res) => {
  let updateTask = await task.findByPk(req.body.id).then((response) => {
    response.description = req.body.description;
    response.save();
  });

  // console.log(req.body);
  res.send(updateTask);
  // res.send("Registro editado com sucesso!");
});

app.post("/updateTaskCompleted", async (req, res) => {
  let updateTask = await task.findByPk(req.body.id).then((response) => {
    if (response.completed == true) {
      response.completed = false;
    } else {
      response.completed = true;
    }
    response.save();
  });
  // res.send('Registro editado com sucesso');
  res.send(updateTask);
  console.log(req.body);
});

app.get("/deleteTask/:id", async (req, res) => {
  let deleteTask = await task.destroy({
    where: {
      id: req.params.id,
    },
  });
  // console.log(req.params);
  res.send(200);
});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  // console.log("rodando");
  ("up");
});

app.get("/readUser/:idUser", async (req, res) => {

  let readUser = await user.findByPk(req.params.idUser);
  // console.log(readUser);

  res.send(readUser);  
  // console.log(req.params);
});