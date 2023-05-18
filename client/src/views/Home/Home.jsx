import React, { useEffect } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import {useDispatch} from "react-redux"
import { getVideogames } from "../../redux/actions";
// import SearchBar from "../../components/SearchBar/SearchBar";


const Home = () => {

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getVideogames())
    }, [dispatch])

    return(
        <div>
            {/* <SearchBar /> */}
            <CardsContainer />            
        </div>
    )
}

export default  Home;