"use strict";
require("dotenv").config();

const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Returns all boards
const getAllBoards = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TracoUsers"); // Replace with your actual database name
    const allBoards = await db.collection("boards").find().toArray();

    res.status(200).json({ status: 200, data: allBoards });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: error, message: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getAllBoards };
