const express = require("express");
const app = express();
// const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const verify = require("jsonwebtoken/verify");
require("dotenv").config();
const port = process.env.PORT || 5000;

// madelware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("How are you?");
});

app.listen(port, () => {
  console.log(`creative agency server side runing ${port}`);
});
