import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";

import Modal from "../Mode/Modal";
import Addcar from "../Addcard/Addcar";

import "./CardInfo.css";

function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState("");
  const [values, setValues] = useState({ ...props.card });
  const [originalValues, setOriginalValues] = useState({ ...props.card });

  useEffect(() => {
    setOriginalValues({ ...props.card });
  }, [props.card]);

  const updateField = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index === -1) {
      setSelectedColor("");
      setValues({
        ...values,
        labels: [...values.labels, label],
      });
    }
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tempTasks = values.tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = values.tasks.map((item) =>
      item.id === id ? { ...item, completed: value } : item
    );

    setValues({
      ...values,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks.filter((item) => item.completed).length;
    return (completed / values.tasks.length) * 100;
  };

  const updateDate = (date) => {
    if (date) {
      setValues({
        ...values,
        date,
      });
    }
  };

  const handleDone = () => {
    if (props.updateCard) {
      props.updateCard(props.boardId, values.id, values);
    }
    if (props.onClose) props.onClose();
  };

  const handleCancelChanges = () => {
    // Restore the original values
    setValues({ ...originalValues });
    if (props.onClose) props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Title</p>
          </div>
          <div className="cardinfo_box_body">
            <Addcar
              defaultValue={values.title}
              text={values.title}
              placeholder="Enter Title"
              buttonText="Set Title"
              onSubmit={(value) => updateField("title", value)}
            />
          </div>
        </div>
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Description</p>
          </div>
          <div className="cardinfo_box_body">
            <Addcar
              defaultValue={values.desc}
              text={values.desc || "Add a Description"}
              placeholder="Enter description"
              buttonText="Set Description"
              onSubmit={(value) => updateField("desc", value)}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Date</p>
          </div>

          <div className="cardinfo_box_body">
            <input
              type="date"
              value={values.date}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(event) => updateDate(event.target.value)}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Labels</p>
          </div>

          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Addcar
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
              }}
            />
          </div>

          <div className="cardinfo_box_task_list">
            {values.tasks?.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <Addcar
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
        <button className="done-button" onClick={handleDone}>
          Done
        </button>
        <button className="delete-button" onClick={handleCancelChanges}>
          Cancel Change
        </button>
      </div>
    </Modal>
  );
}

export default CardInfo;
