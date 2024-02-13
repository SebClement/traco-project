"use strict";
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Delete a board by ID
const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TracoUsers");
    const result = await db
      .collection("boards")
      .deleteOne({ _id: new ObjectId(id) });
    console.log(result);
    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ status: 200, message: "Board deleted successfully" });
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

module.exports = { deleteBoard };
