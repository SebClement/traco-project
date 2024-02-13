import React from "react";
import { X } from "react-feather";

import "../SubBoard/subboard.css";

function Subboard(props) {
  return (
    <div className="subboard" style={{ backgroundColor: props.color }}>
      {props.text}
      {props.close && (
        <X onClick={() => (props.onClose ? props.onClose() : "")} />
      )}
    </div>
  );
}

export default Subboard;
