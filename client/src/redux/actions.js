import { GET_VIDEOGAMES, GET_ID_VIDEOGAME, GET_ALL_GENRES, FILTER_BY_GENRE, FILTER_BY_CREATED,ORDER_AZ, ORDER_RATING } from "./actions.tips";
import axios from "axios";
// const { URL_BACK } = process.env 

export const getVideogames = (name = "") => {
    return async function (dispatch) {
        
        let url = "http://localhost:3001/videogames";

        if (name) {
            url += `?name=${name}`;
          }
          
          const { data } = await axios.get(url);
        const videogames = data;       
        dispatch({ type: GET_VIDEOGAMES, payload: videogames })
    }
}

export const getIdVideogame = (id) => {
    return async function (dispatch) {
        
        const {data} = await axios.get(`http://localhost:3001/videogames/${id}`);        
        const videogame = data;        
        dispatch({ type: GET_ID_VIDEOGAME, payload: videogame })
    }
}

export const getAllGenres = () => {
    return async function (dispatch) {
        
        const {data} = await axios.get(`http://localhost:3001/genres`);        
        const genres = data;        
        dispatch({ type: GET_ALL_GENRES, payload: genres })
    }
}

export const filterByGenre = (genre) => {
    return({ type: FILTER_BY_GENRE, payload: genre })
}

export const filterByCreated = (created) => {
    return({ type: FILTER_BY_CREATED, payload: created })
}

export const orderAz = (order_az) => {
    return({ type: ORDER_AZ, payload: order_az })
}

export const orderRating = (order_rat) => {
    return({ type: ORDER_RATING, payload: order_rat })
}

