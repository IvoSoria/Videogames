import { Link } from "react-router-dom";

const Card = (props) => {

    return(
        <div>
            <Link to={`/${props.id}`}>
                <h2>Name:  {props.name} </h2>
            </Link>
            <h3>Genre: {props.genre.map(gen => gen + " - ")} </h3>
            <img src= {props.image} alt= {props.name} height={"200px"}/>
        </div>
    )
}

export default Card