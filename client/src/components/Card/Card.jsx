import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  return (

    <Link to={`/${props.id}`} className="card-link">
      <div className="card">
        <h2 className="card-name">{props.name}</h2>
        <img src={props.image} alt={props.name} className="card-image" />
        <h3 className="card-genre">Genre: {props.genre.map(gen => gen + " - ")}</h3>
      </div>
    </Link>
  );
};

export default Card;
