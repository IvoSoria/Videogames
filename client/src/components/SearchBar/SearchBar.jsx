import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, getAllGenres, filterByGenre, filterByCreated, orderAz, orderRating } from "../../redux/actions";
import { useSelector } from "react-redux";
import "./SearchBar.css";

const SearchBar = ({setCurrentPage}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const genres = useSelector((state) => state.allGenres);

  const handleSearch = () => {
    dispatch(getVideogames(searchTerm))
    .then(() => {
      setCurrentPage(1);
    })
    
  };

  const handleReset = () => {
    dispatch(getVideogames());
    setSearchTerm("");
    document.getElementById("Alfabetic").value = "none";
    document.getElementById("Rating").value = "none";
    document.getElementById("Origin").value = "none";
    document.getElementById("Genre").value = "none";
  }

  const handleFilterGenre = (event) => {
    dispatch(filterByGenre(event.target.value));
    setCurrentPage(1);
  }

  const handleFilterCreated = (event) => {
    dispatch(filterByCreated(event.target.value));
    setCurrentPage(1);
  }

  const handleOrderAz = (event) => {
    dispatch(orderAz(event.target.value));
  }

  const handleOrderRat = (event) => {
    dispatch(orderRating(event.target.value));
  }

  return (
    <div className="search-bar-container">

      <input
        placeholder="Search by name"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-bar-input"
      />
      <button onClick={handleSearch} className="search-bar-button">Search</button>

      <select onChange={handleOrderAz} id="Alfabetic" className="search-bar-select">
        <option value="none" className="search-bar-option">----Order A-Z----</option>
        <option value="az" className="search-bar-option">A - Z</option>
        <option value="za" className="search-bar-option">Z - A</option>
      </select>

      <select onChange={handleOrderRat} id="Rating" className="search-bar-select">
        <option value="none" className="search-bar-option">----Order Rating----</option>
        <option value="rating" className="search-bar-option">Ascending</option>
        <option value="desrat" className="search-bar-option">Descending</option>
      </select>

      <select onChange={handleFilterCreated} id="Origin" className="search-bar-select">
        <option value="none" className="search-bar-option">----Select Origin----</option>
        <option value="Allcreated" className="search-bar-option">- All Origin -</option>
        <option value="true" className="search-bar-option">Users</option>
        <option value="false" className="search-bar-option">Server</option>
      </select>

      <select onChange={handleFilterGenre} id="Genre" className="search-bar-select">
        <option value="none" className="search-bar-option">----Select Genre----</option>
        <option value="Allgenres" className="search-bar-option">- All Genres -</option>
        {genres.map(gen => (
          <option key={gen.id} value={gen.name} className="search-bar-option">{gen.name}</option>
        ))}
      </select>
      
      <button onClick={handleReset} className="search-bar-button">Reset</button>

    </div>
  );
};

export default SearchBar;
