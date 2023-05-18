import { GET_VIDEOGAMES, GET_ID_VIDEOGAME } from "./actions.tips";

const initialState = {
    allVideogames: [],
    idVideogame: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return { ...state, allVideogames: action.payload};
            
        case GET_ID_VIDEOGAME:
            return { ...state, idVideogame: action.payload};
        
        
        default:
            return {...state };
    }
}

export default reducer;