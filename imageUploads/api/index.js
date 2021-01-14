var express = require("express");
var mongoose = require("mongoose");
var url = "mongodb://msqassociates:sunz8lyoztRAkVIw@cluster0-shard-00-00.uc6o6.mongodb.net:27017,cluster0-shard-00-01.uc6o6.mongodb.net:27017,cluster0-shard-00-02.uc6o6.mongodb.net:27017/MsQAssociates?ssl=true&replicaSet=atlas-7q3496-shard-0&authSource=admin&retryWrites=true&w=majority"
// var url = "mongodb://127.0.0.1:27017/msqartisan?retryWrites=true&w=majority";
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var addDataToDatabase = require("../helpers/addDataTo.js");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.log(err);
  });

app.use(addDataToDatabase);

app.listen(3000, () => {
  console.log("Currently Listening to port 3000");
});
  