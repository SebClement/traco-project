import React from "react";
import { Link } from "react-router-dom";
import "../Components/Header.css";

const Header = () => {
  return (
    <nav className="header">
      <Link to="/" className="header_logo">
        <h2>Traco</h2>
      </Link>
      <div className="header_button">
        <Link to="/signin">
          <button className="nav-button">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="nav-button">Sign Up</button>
        </Link>
        <Link to="/signout">
          <button className="nav-button">Sign Out</button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
