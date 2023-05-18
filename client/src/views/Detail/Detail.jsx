import { useParams } from "react-router-dom"
import React, { useEffect } from "react";
import {useDispatch} from "react-redux"
import { getIdVideogame } from "../../redux/actions";
import { useSelector } from "react-redux";


const Detail = () => {
    const {id} = useParams() 
    
    const dispatch = useDispatch();    
    
    useEffect(()=> {
        console.log(id);
        dispatch(getIdVideogame(id))
        console.log(videogame);
    }, [dispatch, id]);
    
    const videogame = useSelector((state) => state.idVideogame)

    return(
        <div>
            <h1>Details of the {videogame.name} video game:</h1>
            <img src={videogame.image} alt={videogame.name} height={"200px"}/>
            <h2>Platforms:</h2>
            <h3>{videogame.platform?.map(plat => plat + " - ")} </h3>
            <h2>Released:</h2>
            <h3>{videogame.released} </h3>
            <h2>Rating:</h2>
            <h3>{videogame.rating} </h3>
            <h2>Genres:</h2>
            <h3>{videogame.genres?.map(gen => gen + " - ")} </h3>
            <h2>Description:</h2>            
            <h3>{videogame.description?.replace(/<[^>]+>/g, "")} </h3>
        </div>
    )
}

export default  Detail;