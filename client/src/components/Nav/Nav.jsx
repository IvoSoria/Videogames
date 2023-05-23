import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav-container">
      <button className="nav-button">
        <Link to="/home">HOME</Link>
      </button>
      <button className="nav-button">
        <Link to="/form">FORM</Link>
      </button>
    </nav>
  );
};

export default Nav;



