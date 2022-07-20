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

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.iuwr8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();

    const singupUserCollaction = client
      .db("company-assigenment")
      .collection("singupUser");

    // singup user
    app.post("/singup", async (req, res) => {
      const { name, email, password, date } = req.body;
      const userEx = await singupUserCollaction.findOne({ email: email });
      const user = { name, email, password, date };
      if (userEx) {
        return res.send({ message: "User alrady insert." });
      } else {
        const result = await singupUserCollaction.insertOne(user);
        return res.send({ message: "User insert successfull", result });
      }
    });

    // login user
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      const user = await singupUserCollaction.findOne({ email: email });
      if (user && user.password === password) {
        res.send({ message: "User valid", user });
      } else {
        res.send({ message: "User not valid" });
      }
    });
  } finally {
    // await client.close()
  }
};

run().catch(console.dir());

// not route erroe
app.get((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// handel server error
app.get((err, req, res, next) => {
  res.status(500).json({
    messgae: "Something broken",
  });
});

app.get("/", (req, res) => {
  res.send("How are you?");
});

app.listen(port, () => {
  console.log(`creative agency server side runing ${port}`);
});
