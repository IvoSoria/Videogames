import { GET_VIDEOGAMES, GET_ID_VIDEOGAME, FILTER_VIDEOGAMES, ORDER_VIDEOGAMES } from "./actions.tips";
import axios from "axios";
const { URL_BACK } = process.env 

export const getVideogames = () => {
    return async function (dispatch) {
        
        const {data} = await axios.get(`http://localhost:3001/videogames`);

        const videogames = data;
        console.log(videogames);
        
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

// export const filterByGenre = (genre) => {
//     dispatch({ type: FILTER_VIDEOGAMES, payload: genre })
// }

// //!falta filtrar por created!

// export const orderVideogames = (order) => {
//     dispatch({ type: ORDER_VIDEOGAMES, payload: order })
// }