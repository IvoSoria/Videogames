import React from "react";
import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";

const Nav = () => {

    return (
        <nav>

            <button>
                <Link to="/home"> HOME </Link>
            </button>
            <button>
                <Link to="/form"> FORM </Link>
            </button>

        </nav>
    )
}

export default Nav;


