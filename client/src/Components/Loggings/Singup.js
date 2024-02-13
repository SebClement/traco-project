import React, { useState } from "react";
import "../Loggings/logging.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      const data = await response.json();
      console.log("Signup successful", data);
      navigate("/signin");
    } catch (error) {
      console.error("Error during sign up:", error.message);
    }
  };

  return (
    <div className="signup-form">
      <div className="signup-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Sign Up</h4>
          <input
            type="text"
            name="username"
            value={state.username}
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={state.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
