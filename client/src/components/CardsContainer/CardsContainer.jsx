import Card from "../Card/Card";
import { useSelector } from "react-redux";

const CardsContainer = () => {
    const videogames = useSelector(state => state.filterVideogames)

    return(
        <div>
            {videogames.map(videogame => {
                return <Card 
                key={videogame.id}
                id={videogame.id}
                name= {videogame.name}
                image= {videogame.image}
                genre= {videogame.genre}
                />
            })}
        </div>
    )
}

export default CardsContainer;
