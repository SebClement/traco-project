import React, { useState } from "react";
import "../Loggings/logging.css";

const Signin = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      window.location.replace("/dashboard");
      const data = await response.json();
      console.log("Signin successful", data);
    } catch (error) {
      setError(error.message);
      console.error("Error during sign in:", error.message);
    }
  };

  return (
    <div className="signin-form">
      <div className="signin-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Sign In</h4>
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
          <button type="submit">Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
