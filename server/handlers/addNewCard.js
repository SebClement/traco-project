const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { uuid } = require("uuidv4");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addNewCard = async (req, res) => {
  try {
    const { title, labels, tasks, date, desc } = req.body;
    const cardId = uuid();
    const { id } = req.params;
    console.log(" id", id);
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db("TracoUsers");
    console.log("connected!");

    const result = await db.collection("boards").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          cards: {
            id: cardId,
            title: title,
            labels: labels || [],
            tasks: tasks || [],
            date: date || "",
            desc: desc || "",
          },
        },
      }
    );

    console.log(result);

    result.matchedCount
      ? res
          .status(200)
          .json({ status: 200, data: result, message: "card added!" })
      : res.status(404).json({
          status: 404,
          data: req.body,
          message: "board not found",
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

module.exports = { addNewCard };
