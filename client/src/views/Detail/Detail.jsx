import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getIdVideogame } from "../../redux/actions";
import { useSelector } from "react-redux";
import LoadingD from "../../components/Loading/LoadingD";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getIdVideogame(id))
      .then(()=> {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error while retrieving the videogames",error);
        setIsLoading(false);
      })
  }, [dispatch, id]);

  const videogame = useSelector((state) => state.idVideogame);

  console.log(videogame.genres);

  return isLoading? <LoadingD /> : (
    <div className="detail-container">
      <h1 className="detail-title">Details of the {videogame.name} video game:</h1>
      <img src={videogame.image} alt={videogame.name} className="detail-image" />
      <h2 className="detail-heading">Platforms:</h2>
      <h3 className="detail-text">{videogame.platform?.map((plat) => plat + " - ")}</h3>
      <h2 className="detail-heading">Released:</h2>
      <h3 className="detail-text">{videogame.released}</h3>
      <h2 className="detail-heading">Rating:</h2>
      <h3 className="detail-text">{videogame.rating}</h3>
      <h2 className="detail-heading">Genres:</h2>
      <h3 className="detail-text">{videogame.genres?.map((gen) => gen + " - ")}</h3>      
      <h2 className="detail-heading">Description:</h2>
      <h3 className="detail-text">{videogame.description?.replace(/<[^>]+>/g, "")}</h3>
    </div>
  );
};

export default Detail;
