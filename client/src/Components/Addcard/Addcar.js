import React, { useState } from "react";
import { X } from "react-feather";
import "./Addcar.css";

function Addcar(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.text || "");

  return (
    <div className="edit">
      {showEdit ? (
        <form
          className={`edit_card ${props.editClass || ""}`}
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onSubmit) props.onSubmit(inputValue);
            setShowEdit(false);
            setInputValue("");
          }}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder || "Enter item"}
          />
          <div className="edit_card_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <X onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p
          className={`edit_display ${props.displayClass || ""}`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || "Add Card"}
        </p>
      )}
    </div>
  );
}

export default Addcar;
