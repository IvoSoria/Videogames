import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import {useDispatch, useSelector} from "react-redux"
import { getVideogames } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";


const Home = () => {

    const dispatch = useDispatch();
    const videogames = useSelector(state => state.filterVideogames)

    useEffect(()=> {
        if(!videogames.length) {
            dispatch(getVideogames())
        }        
    }, [dispatch])

   
    return(
        <div>
            <SearchBar />
            <CardsContainer />            
        </div>
    )
}

export default  Home;