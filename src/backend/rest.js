const express = require("express");
const bodyParser = require("body-parser");
const cardEntryModel = require("./entry-schema.js");
const mongoose = require("mongoose");

const app = express();

let cuentasBancarias = [];

mongoose
  .connect(
    "mongodb+srv://asanchz85:vmOWnX2a9eWCKwgq@tarjeta-angular.0ns6lcx.mongodb.net/bank?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("error: ", err));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-Width,Content-Type,Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use("/bank", (req, res, next) => {
  cardEntryModel.find().then((data) => {
    cuentasBancarias = data;
    res.json({ 'cuentasBancaras': cuentasBancarias });
  });
});

app.post("/addcard", (req, res) => {
  const cardEntry = new cardEntryModel({
    titular: req.body.titular,
    numeroTarjeta: req.body.numeroTarjeta,
    fechaCaducidad: req.body.fechaCaducidad,
    cvv: req.body.cvv,
    fechaCreacion: new Date(),
  });
  cardEntry.save();
  cuentasBancarias.push(cardEntry);
  res.status(200).json({
    message: "Post Submitted",
  });
});

app.get("/cards", (req, res, next) => {
  cardEntryModel
    .find()
    .then((data) => {
      cuentasBancarias = data;
      res.json({ 'cards': data });
    })
    .catch((err) =>
      console.log("error while retrieving through get method ", err)
    );
});

module.exports = app;
