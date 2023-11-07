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
  .catch((err) => console.log("error to connect due to: ", err));

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
    res.json({ cuentasBancaras: cuentasBancarias });
  });
});

app.post("/addcard", (req, res) => {
  try {
    const cardEntry = new cardEntryModel({
      titular: req.body.titular,
      numeroTarjeta: req.body.numeroTarjeta,
      fechaCaducidad: req.body.fechaCaducidad,
      cvv: req.body.cvv,
      fechaCreacion: new Date(),
    });
    cardEntry.save();
    cuentasBancarias.push(cardEntry);
    res.status(201).json({
      message: "Post Submitted",
    });
  } catch (error) {
    if (error.statusCode === 500) res.status(500).json("oh noes!");

    res.send("Error: ", error);
    console.log("Error", error);
  }
});

app.get("/cards", (req, res, next) => {
  cardEntryModel
    .find()
    .then((data) => {
      cuentasBancarias = data;
      res.status(200).json({
        cards: data,
      });
    })
    .catch((err) =>
      console.log("error while retrieving through get method -> ", err)
    );
});

app.delete("/removecard/:id", (req, res) => {
  cardEntryModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(202).json({
        message: "Post delete",
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({
          message: "Bad request",
        })
        .send("Error: ", error);
      console.log("Error", error);
    });
});

app.put("/update-entry/:card", (res, req) => {
  const updateEntry = new cardEntryModel({
    _id: req.body._id,
    titular: req.body.titular,
    numeroTarjeta: req.body.numeroTarjeta,
    fechaCaducidad: req.body.fechaCaducidad,
    cvv: req.body.cvv,
    fechaCreacion: new Date(),
  });

  cardEntryModel
    .updateOne({ _id: req.body._id }, updateEntry)
    .then(() => {
      res.status(202).json({
        message: "Post updated",
      });
    })
    .catch((error) => {
      res
        .status(404)
        .json({
          message: "I don't have that",
        })
        .send("Error: ", error);
      console.log("Error", error);
    });
});

module.exports = app;
