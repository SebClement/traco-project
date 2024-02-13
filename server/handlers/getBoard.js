"use strict";
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getBoard = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TracoUsers");
    const board = await db.collection("boards").findOne({ _id: ObjectId(id) });

    if (board) {
      res.status(200).json({ status: 200, data: board });
    } else {
      res.status(404).json({ status: 404, message: "Board not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: error, message: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { getBoard };
