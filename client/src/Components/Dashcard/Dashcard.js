import React, { useState } from "react";
import { MoreVertical, Trash } from "react-feather";
import "../Dashcard/Dashcard.css";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "../Cardinfo/CardInfo";

const Dashcard = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { id, title, date, tasks, labels } = props.card;

  const handleDragEnd = () => {
    props.handleDragEnd(id, props.boardId);
  };

  const handleDragEnter = () => {
    props.handleDragEnter(id, props.boardId);
  };

  const handleToggleCheck = () => {
    setIsChecked(!isChecked);
    setShowDropdown(false);
  };

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  const handleDeleteCard = (e) => {
    e.stopPropagation();
    props.deleteCard(props.boardId, id);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    props.onDrop(cardId, id);
  };

  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          updateCard={props.updateCard}
          boardId={props.boardId}
          onClose={() => setShowModal(false)}
          deleteCard={handleDeleteCard}
        />
      )}
      <div
        className={`card ${isChecked ? "checked" : ""}`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onClick={() => setShowModal(true)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div className="delete-button-container">
            <Trash onClick={handleDeleteCard} />
          </div>
          <div className="card_top_more" onClick={() => setShowDropdown(true)}>
            <MoreVertical />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="card_dropdown">
                  <p onClick={handleToggleCheck}>
                    {isChecked ? "Undo" : "Mark Done"}
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{title}</div>
        <div className="card_footer">
          {date && <p className="card_footer_item">{formatDate(date)}</p>}
          {tasks && tasks.length > 0 && (
            <p className="card_footer_item">
              {tasks.filter((item) => item.completed).length}/{tasks.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashcard;
