import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <Link to="/signin" className="get-started-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
