import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import Sidebar from "../Sidebar/Sidebar";
import Addcar from "../Addcard/Addcar";

const DashboardLayout = () => {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({
    boardId: "",
    cardId: "",
  });

  const fetchBoards = () => {
    fetch("/boards", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const addCardToBoard = (boardId, title) => {
    const newCard = {
      id: "",
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    fetch(`/boards/${boardId}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchBoards();
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });
  };

  const submitNewBoard = (title) => {
    fetch("/boards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchBoards();
      })
      .catch((error) => {
        console.error("Error adding board:", error);
      });
  };

  const addBoard = (title) => {
    submitNewBoard(title);
  };

  const deleteCard = (boardId, cardId) => {
    console.log("delete card testing ");
    console.log(boardId, cardId);
    fetch(`/boards/${boardId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchBoards();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  const deleteBoard = (boardId) => {
    fetch(`/boards/${boardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchBoards();
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  const removeBoard = (boardId) => {
    deleteBoard(boardId);
  };

  const handleDrop = (cardId, targetBoardId) => {
    console.log("Card dropped with ID:", cardId);
    console.log("Target Board ID:", targetBoardId);
  };

  const handleDragEnd = (sourceId, sourceIndex, targetId, targetIndex) => {
    const sourceBoardIndex = boards.findIndex((board) => board.id === sourceId);
    const targetBoardIndex = boards.findIndex((board) => board.id === targetId);

    if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

    const sourceCard = boards[sourceBoardIndex]?.cards[sourceIndex];

    const updatedBoards = [...boards];

    if (targetId === sourceId) {
      updatedBoards[sourceBoardIndex].cards.splice(sourceIndex, 1);
      updatedBoards[targetBoardIndex].cards.splice(targetIndex, 0, sourceCard);
    } else {
      updatedBoards[sourceBoardIndex].cards.splice(sourceIndex, 1);
      updatedBoards[targetBoardIndex].cards.splice(targetIndex, 0, sourceCard);
    }

    setBoards(updatedBoards);
  };

  const handleDragEnter = (targetId, targetIndex) => {
    if (targetId === targetCard.boardId && targetIndex === targetCard.cardId)
      return;

    setTargetCard({
      boardId: targetId,
      cardId: targetIndex,
    });
  };

  const updateCard = (boardId, cardId, updatedCard) => {
    console.log("request to update boards");
    console.log(boardId, cardId);
    fetch(`/boards/${boardId}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedBoards = boards.map((board) => {
          if (board._id === boardId) {
            const updatedCards = board.cards.map((card) => {
              if (card.id === cardId) {
                return { ...card, ...updatedCard };
              }
              return card;
            });
            return { ...board, cards: updatedCards };
          }
          return board;
        });
        setBoards(updatedBoards);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  return (
    <div className="main-section">
      <Sidebar />
      <div className="content-section">
        <div className="app_outer">
          <div className="app_boards">
            {boards.map((board) => (
              <Board
                key={board._id}
                board={board}
                removeBoard={removeBoard}
                addBoard={addBoard}
                addCard={addCardToBoard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
                deleteCard={deleteCard}
                onDrop={handleDrop}
              />
            ))}
            <div className="app_boards_board">
              <Addcar
                displayClass="app_boards_add-board"
                text="Add Board"
                placeholder="Enter Board Title"
                onSubmit={(value) => addBoard(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
