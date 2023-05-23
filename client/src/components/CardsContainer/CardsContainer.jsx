import React from "react";
import Card from "../Card/Card";
import "./CardsContainer.css";

const CardsContainer = ({ videogames }) => {
  return (
    <div className="cards-container">
      {
        videogames.map((videogame) => (
          <Card
            key={videogame.id}
            id={videogame.id}
            name={videogame.name}
            image={videogame.image}
            genre={videogame.genres}
          />
        ))}
    </div>
  );
};

export default CardsContainer;
