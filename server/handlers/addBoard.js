const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addBoard = async (req, res) => {
  try {
    const title = req.body.title;
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("TracoUsers");
    console.log("connected!");

    const result = await db.collection("boards").insertOne({ title: title });
    console.log(result);
    result
      ? res
          .status(200)
          .json({ status: 200, data: result, message: "board added!" })
      : res.status(400).json({
          status: 400,
          data: req.body,
          message: "could not add board",
        });

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: error, message: "internal server error" });
  }
};

module.exports = { addBoard };
