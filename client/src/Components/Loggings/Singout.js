import React, { useState } from "react";
import "../Loggings/logging.css";

const Signout = () => {
  const [state, setState] = useState({
    userId: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: state.userId }),
      });
      if (!response.ok) {
        throw new Error("Failed to sign out");
      }
      window.location.replace("/");
      const data = await response.json();
      console.log("Signout successful", data);
      // Handle successful sign-out (redirect, show a success message, etc.)
    } catch (error) {
      console.error("Error during sign out:", error.message);
      // Handle failed sign-out (show an error message, etc.)
    }
  };

  return (
    <div className="signout-form">
      <div className="signout-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Sign Out</h4>
          <input
            type="text"
            name="userId"
            value={state.userId}
            placeholder="Enter User ID"
            onChange={handleChange}
          />
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default Signout;
