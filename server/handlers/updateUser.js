"use strict";
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { updatedFields } = req.body;

  if (!userId || !updatedFields) {
    return res.status(400).json({ status: 400, message: "Invalid request" });
  }

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TracoUsers");
    const result = await db
      .collection("users")
      .updateOne({ _id: ObjectId(userId) }, { $set: updatedFields });

    if (result.modifiedCount === 1) {
      res
        .status(200)
        .json({ status: 200, message: "User updated successfully" });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "User not found or no changes made" });
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

module.exports = { updateUser };
