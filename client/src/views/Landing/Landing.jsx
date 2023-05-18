import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Discover the best video games here!!</h1>
      <button className="landing-button">
        <Link to="/home">START!!</Link>
      </button>
    </div>
  );
};

export default Landing;
