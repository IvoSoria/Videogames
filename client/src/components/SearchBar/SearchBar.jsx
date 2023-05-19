import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, getAllGenres, filterByGenre, filterByCreated, orderAz, orderRating } from "../../redux/actions";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
    
  useEffect(()=> {
      dispatch(getAllGenres())
  }, [dispatch]);
  
  const genres = useSelector((state) => state.allGenres)

  const handleSearch = () => {
    dispatch(getVideogames(searchTerm)); 
  };

  const handleAll = () => {
    dispatch(getVideogames());
    setSearchTerm("")
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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAll}>All</button>

      <select onChange={handleFilterGenre}>
      <option value= "none" >----Select Genre----</option>
      <option value= "Allgenres" >- All Genres -</option>
        {genres.map(gen => <option key={gen.id} value= {gen.name} >{gen.name}</option>)}     
      </select>

      <select onChange={handleFilterCreated}>
      <option value= "none" >----Select Origin----</option>
      <option value= "Allcreated" >- All Origin -</option> 
      <option value= "true" >Users</option>   
      <option value= "false" >Server</option>     
      </select>

      <select onChange={handleOrderAz}>
      <option value= "none" >----Order A-Z----</option>
      <option value= "az" >A - Z</option>   
      <option value= "za" >Z - A</option>     
      </select>

      <select onChange={handleOrderRat}>
      <option value= "none" >----Order Rating----</option>
      <option value= "rating" >Ascending</option>   
      <option value= "desrat" >Descending</option>     
      </select>
    </div>
  );
};


export default SearchBar;
