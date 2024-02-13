const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new client
    const client = new MongoClient(MONGO_URI, options);

    // Connect to the client
    await client.connect();

    // Connect to the database (db name is provided as an argument to the function)
    const db = client.db("TracoUsers");
    console.log("Connected to the database!");

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user document
    const newUser = { email, password };
    const result = await db.collection("users").insertOne(newUser);

    // Return success response
    res.status(201).json({ message: "User created successfully", newUser });

    // Close the connection to the database server
    client.close();
    console.log("Disconnected from the database!");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp };
