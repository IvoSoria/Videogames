import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, getAllGenres, filterByGenre, filterByCreated, orderAz, orderRating } from "../../redux/actions";
import { useSelector } from "react-redux";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);
  
  const genres = useSelector((state) => state.allGenres);

  const handleSearch = () => {
    dispatch(getVideogames(searchTerm)); 
  };

  const handleAll = () => {
    dispatch(getVideogames());
    setSearchTerm("");
  }  

  const handleFilterGenre = (event) => {
    dispatch(filterByGenre(event.target.value));
  }


  const handleFilterCreated = (event) => {
    dispatch(filterByCreated(event.target.value));
  }

  const handleOrderAz = (event) => {
    dispatch(orderAz(event.target.value));
  }

  const handleOrderRat = (event) => {
    dispatch(orderRating(event.target.value));
  }

  return (
    <div className="search-bar-container">

      <select onChange={handleOrderAz} className="search-bar-select">
        <option value="none" className="search-bar-option">----Order A-Z----</option>
        <option value="az" className="search-bar-option">A - Z</option>
        <option value="za" className="search-bar-option">Z - A</option>
      </select>

      <select onChange={handleOrderRat} className="search-bar-select">
        <option value="none" className="search-bar-option">----Order Rating----</option>
        <option value="rating" className="search-bar-option">Ascending</option>
        <option value="desrat" className="search-bar-option">Descending</option>
      </select>
      
      <select onChange={handleFilterCreated} className="search-bar-select">
        <option value="none" className="search-bar-option">----Select Origin----</option>
        <option value="Allcreated" className="search-bar-option">- All Origin -</option>
        <option value="true" className="search-bar-option">Users</option>
        <option value="false" className="search-bar-option">Server</option>
      </select>

      <select onChange={handleFilterGenre} className="search-bar-select">
        <option value="none" className="search-bar-option">----Select Genre----</option>
        <option value="Allgenres" className="search-bar-option">- All Genres -</option>
        {genres.map(gen => (
        <option key={gen.id} value={gen.name} className="search-bar-option">{gen.name}</option>
        ))}
      </select>

      <input
        placeholder="Search by name"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-input"
      />
      <button onClick={handleSearch} className="search-bar-button">Search</button>
      <button onClick={handleAll} className="search-bar-button">All</button>

      

      

      
    </div>
  );
};

export default SearchBar;
