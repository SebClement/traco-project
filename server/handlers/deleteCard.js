"use strict";
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteCard = async (req, res) => {
  const { boardId, cardId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TracoUsers");

    // Find the board by ID
    const board = await db
      .collection("boards")
      .findOne({ _id: new ObjectId(boardId) });

    if (!board) {
      res.status(404).json({ status: 404, message: "Board not found" });
      return;
    }

    // Find the card index within the board
    const cardIndex = board.cards.findIndex(
      (card) => card.id.toString() === cardId
    );

    if (cardIndex === -1) {
      res.status(404).json({ status: 404, message: "Card not found" });
      return;
    }

    // Delete the card from the array
    board.cards.splice(cardIndex, 1);

    // Update the board with the modified cards array
    await db
      .collection("boards")
      .updateOne(
        { _id: new ObjectId(boardId) },
        { $set: { cards: board.cards } }
      );

    res.status(200).json({ status: 200, message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ status: 500, error: error, message: "Internal Server Error" });
  } finally {
    client.close();
  }
};

module.exports = { deleteCard };
