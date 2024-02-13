const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new client
    const client = new MongoClient(MONGO_URI, options);

    // Connect to the client
    await client.connect();

    // Connect to the database (db name is provided as an argument to the function)
    const db = client.db("TracoUsers");
    console.log("Connected to the database!");

    // Find the user in the database
    const user = await db.collection("users").findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // User authenticated successfully
    res.status(200).json({ message: "User signed in successfully", user });

    // Close the connection to the database server
    client.close();
    console.log("Disconnected from the database!");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signIn };
