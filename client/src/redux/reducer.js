import { GET_VIDEOGAMES, GET_ID_VIDEOGAME, GET_ALL_GENRES, FILTER_BY_CREATED, FILTER_BY_GENRE, ORDER_AZ, ORDER_RATING} from "./actions.tips";

const initialState = {
    allVideogames: [],
    idVideogame: {},
    filterVideogames: [],
    allGenres: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VIDEOGAMES:
            return { ...state, allVideogames: action.payload , filterVideogames: action.payload};
            
        case GET_ID_VIDEOGAME:
            return { ...state, idVideogame: action.payload};

        case GET_ALL_GENRES:
            return { ...state, allGenres: action.payload}; 

        case FILTER_BY_GENRE:
            const filterVideogames = state.allVideogames.filter(vg => vg.genres.includes(action.payload))
            if (filterVideogames.length === 0 && action.payload !== "Allgenres") {
                alert("No video games found for the selected genre.");
                return { ...state, ...state.allVideogames};          
              }
            return { ...state,
                filterVideogames: action.payload === "Allgenres"
                ? [...state.allVideogames]
                : filterVideogames            
            }

        case FILTER_BY_CREATED:
            const filterByCreated = state.allVideogames.filter(vg => vg.created === (action.payload === "true"))
            return {...state, 
                filterVideogames: action.payload === "Allcreated"
                ? [...state.allVideogames]
                : filterByCreated }
      
        case ORDER_AZ:
            const orderAzFilter = action.payload === "az"
            ? [...state.filterVideogames.sort((a, b) => a.name.localeCompare(b.name))]
            : [...state.filterVideogames.sort((a, b) => b.name.localeCompare(a.name))];

            const orderAzAll = action.payload === "az"
            ? [...state.allVideogames.sort((a, b) => a.name.localeCompare(b.name))]
            : [...state.allVideogames.sort((a, b) => b.name.localeCompare(a.name))];

            return { ...state, filterVideogames: orderAzFilter, allVideogames: orderAzAll };

        case ORDER_RATING:
            const orderRatFilter = action.payload === "rating"
            ? [...state.filterVideogames.sort((a, b) => a.rating - b.rating)]
            : [...state.filterVideogames.sort((a, b) => b.rating - a.rating)];

            const orderRatAll = action.payload === "rating"
            ? [...state.allVideogames.sort((a, b) => a.rating - b.rating)]
            : [...state.allVideogames.sort((a, b) => b.rating - a.rating)];

            return { ...state, filterVideogames: orderRatFilter, allVideogames: orderRatAll };
            


        default:
            return {...state };
    }
}

export default reducer;