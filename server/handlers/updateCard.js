const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateCard = async (req, res) => {
  try {
    const { title, labels, tasks, date, desc } = req.body;
    const { boardId, cardId } = req.params;

    // Create a new client
    const client = new MongoClient(MONGO_URI, options);

    // Connect to the client
    await client.connect();

    // Connect to the database
    const db = client.db("TracoUsers");

    // Update the card in the specified board
    const result = await db.collection("boards").updateOne(
      { _id: new ObjectId(boardId), "cards.id": cardId },
      {
        $set: {
          "cards.$.id": cardId,
          "cards.$.title": title,
          "cards.$.labels": labels || [],
          "cards.$.tasks": tasks || [],
          "cards.$.date": date || "",
          "cards.$.desc": desc || "",
        },
      }
    );

    if (result.matchedCount) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "Card updated!" });
    } else {
      res
        .status(404)
        .json({ status: 404, data: req.body, message: "Card not found" });
    }

    // Close the connection to the database server
    client.close();
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: error, message: "Internal Server Error" });
  }
};

module.exports = { updateCard };
