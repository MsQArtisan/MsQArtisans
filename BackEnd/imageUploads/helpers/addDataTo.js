var schema = require("../modelShcema/Schema.js");
var express = require("express");
var app = express();

app.post("/api/imageUpload", (req, res) => {
  const usersData = new schema(req.body);
  try {
    usersData.save();
    res.send(true);
  } catch (error) {
    res.send(false);
  }
});
app.get("/api/getAllData", async (req, res) => {
  const usersData = await schema.find({});

  try {
    res.send(usersData);
  } catch (err) {
    res.send(false);
  }
});
app.get("/", (req, res) => {
  res.send("True");
});

module.exports = app;
