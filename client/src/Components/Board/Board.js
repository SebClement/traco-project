import React, { useState } from "react";
import { PlusCircle, Trash, MoreVertical } from "react-feather";
import "../Board/Board.css";
import Addcar from "../Addcard/Addcar";
import Dropdown from "../Dropdown/Dropdown";
import Dashcard from "../Dashcard/Dashcard";

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDeleteCard = (cardId) => {
    if (props.deleteCard) {
      props.deleteCard(props.board?._id, cardId);
    }
    setShowDropdown(false);
  };

  return (
    <div className="board">
      <div className="board_top">
        <p className="board_top_title">{props.board?.title}</p>
        <div className="board_top_icons">
          <PlusCircle onClick={() => props.addCard(props.board?._id)} />
          <Trash onClick={() => props.removeBoard(props.board?._id)} />
          <MoreVertical onClick={() => setShowDropdown(true)} />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board?._id)}>
                  Delete Board
                </p>
                {props.board?.cards?.map((card) => (
                  <p key={card.id} onClick={() => handleDeleteCard(card.id)}>
                    Delete Card - {card.title}
                  </p>
                ))}
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Dashcard
            key={item.title}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?._id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
            deleteCard={props.deleteCard}
            onDrop={props.onDrop}
          />
        ))}
        <Addcar
          displayClass="boards_cards_add"
          text="Additional Card"
          placeholder="Enter Title"
          onSubmit={(value) => props.addCard(props.board?._id, value)}
        />
      </div>
    </div>
  );
};

export default Board;
