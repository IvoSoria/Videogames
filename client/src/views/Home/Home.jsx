import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginated from "../../components/Paginated/Paginated";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import LoadingH from "../../components/Loading/LoadingH";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.filterVideogames);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;

  useEffect(() => {
    dispatch(getVideogames())
      .then(() => {
        setIsLoading(false)
      })
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);


  return isLoading ? <LoadingH /> : (
    <div className="container">
      <SearchBar setCurrentPage={setCurrentPage}/>
      <Paginated
        currentPage={currentPage}
        totalPages={Math.ceil(videogames.length / videogamesPerPage)}
        onPageChange={handlePageChange}
      />
      <CardsContainer videogames={currentVideogames} />
      <Paginated
        currentPage={currentPage}
        totalPages={Math.ceil(videogames.length / videogamesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
