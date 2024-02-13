require("dotenv").config();
const express = require("express");
const app = express();
const { addBoard } = require("./handlers/addBoard");
const { getBoard } = require("./handlers/getBoard");
const { getAllBoards } = require("./handlers/getAllBoards");
const { deleteBoard } = require("./handlers/deleteBoard");
// const { updateUser } = require("./handlers/updateUser");
const { MongoClient, Timestamp } = require("mongodb");
const { addNewCard } = require("./handlers/addNewCard");
const { updateCard } = require("./handlers/updateCard");
const { deleteCard } = require("./handlers/deleteCard");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/auth");
const { MONGO_URI, JWT_SECRET } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/boards", auth, addBoard);
app.get("/boards/:id", getBoard);
app.get("/boards", getAllBoards);
app.delete("/boards/:id", deleteBoard);
app.post("/boards/:id/cards", addNewCard);
app.put("/boards/:boardId/cards/:cardId", updateCard);
app.delete("/boards/:boardId/cards/:cardId", deleteCard);
// app.put("/users/:userId", updateUser);

const users = [
  { _id: 1, username: "user1", password: "pass1" },
  { _id: 2, username: "user2", password: "pass2" },
];

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  await client.connect();
  const db = await client.db("TracoUsers");
  const hash = await bcrypt.hashSync(password, 10);
  const result = await db
    .collection("users")
    .insertOne({ username, password: hash, email });

  if (result.insertedId) {
    res
      .status(200)
      .json({ status: 200, data: result, message: "User signed up!" });
  } else {
    console.log(result);
    res
      .status(400)
      .json({ status: 400, data: req.body, message: "Could not sign up user" });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  await client.connect();
  const db = await client.db("TracoUsers");
  const result = await db.collection("users").findOne({ username });
  console.log(result);

  if (result) {
    const isPasswordValid = await bcrypt.compare(password, result.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: result._id }, JWT_SECRET);
      res.cookie("token", token, { maxAge: 60 * 60 * 60 });
      res.status(200).json({ status: 200, token, message: "User signed in!" });
    } else {
      res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }
  } else {
    res
      .status(401)
      .json({ status: 401, message: "Invalid username or password" });
  }
});

app.post("/signout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User signed out!" });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

startServer();
