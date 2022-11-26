const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

const { col } = require("sequelize");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let user = models.User;

app.get("/", (req, res) => {
  res.send("Serv rodando");
});

// app.post("/login", async (req, res) => {
//   console.log(req.body);
// });

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

// app.get("/create", async (req, res) => {
//   let create = await user.create({
//     login: "Teste",
//     password: "Teste",
//     email: "Teste@asdas",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   res.send("Usuario criado com sucesso!");
// });

app.get("/read", async (req, res) => {
  let read = await user.findAll({
    raw: true,
  });
  //  res.send("Olhe no console!");
  res.send(read);

  // console.log(read);
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

// app.get("/delete", async (req, res) => {
//   user.destroy({
//     where: {
//       id: 2,
//     },
//   });
//   res.send("Usuario deletado com sucesso!");
// });

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  // console.log("rodando");
  ("up");
});
