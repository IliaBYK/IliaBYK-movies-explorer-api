import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../../hooks/useMovieSearch";
import Container from "../../Container/Container";
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import SearchFormHook from "../SearchForm/SearchFormHook";
import MoviesMore from "../../Movies/MoviesMore/MoviesMore";
import Preloader from "../Preloader/Preloader";
import { useMoviesCount } from "../../../hooks/useMoviesCount";
import Modal from "../../Modal/Modal";

function MoviesCardList({ 
  movies, 
  handleMovieDelete, 
  handleSave, 
  handleSearch, 
  isLoading,
  error, 
  savedMovies, 
  shortMovies, 
  /* handleChange, */
  btnVisible,
  getShorts,
  shorts,
  setSearchParams,
  /* isEmpty */
  movieQuery,
  setMovies
  }) {

  const {items, loadMore} = useMoviesCount();

  const shorties = (movie) => shorts ? movie.duration <= 40 : movie.duration > 40;
  const moviesFilter = useMovieSearch(movies, movieQuery, shorties);

  /* useEffect(() => {
    sessionStorage.setItem("found", JSON.stringify(moviesFilter));
    const found = sessionStorage.getItem("found");
    if(!found) {
      return
    } else {
      console.log(JSON.parse(found));
    }
    /* found && setMovies(JSON.stringify(JSON.parse(found)));
  }, [moviesFilter]) */

  const movieElements = moviesFilter?.slice(0, items)?.map((movieItem) => (
    <li key={movieItem.id || movieItem.movieId}>
      <MoviesCard 
        key={movieItem.id || movieItem.movieId}
        movie={movieItem}
        deleteMovie={handleMovieDelete}
        handleSave={handleSave}
        savedMovies={savedMovies}
        isLoading={isLoading}/>
    </li>))

  /* const shortMovieElements = shortMovies?.slice(0, items)?.map((movieItem) => (
    <li key={movieItem._id || movieItem.movieId}>
      <MoviesCard
        key={movieItem._id || movieItem.movieId}
        movie={movieItem}
        deleteMovie={handleMovieDelete}
        handleSave={handleSave}
        savedMovies={savedMovies}/>
    </li>)) */

  return (
    <>
      {/* <SearchForm 
        onSubmit={handleSearch}
        searchTerm={value}
        handleChange={handleChange}
        renderShorts={getShorts}
        error={error}
        value={shorts}
      /> */}
      <SearchFormHook
        movieQuery={movieQuery}
        shorts={shorts}
        setSearchParams={setSearchParams}
        error={error}
        handleSearch={handleSearch}
      />
      <Container class="cards" component="div" componentUl="ul" mix="cards">
        {error 
        ? 
          <Modal isOpen={error} error={error} />
          /* <p className="cards__error">Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз</p>  */
        : 
          (/* isLoading */isLoading ? <Preloader /> : 
          (/* shorts ? shortMovieElements :  */movieElements))}
      </Container>
      {moviesFilter?.length === 0 && !error && movieQuery && !isLoading && (
        <p>Ничего не найдено...</p>
      )}
      {btnVisible && items < moviesFilter?.length && !isLoading/* && (shorts ? items < shortMovies?.length : true) */ && <MoviesMore onClick={loadMore} text="Ещё" /> }
    </>
  )
}

export default MoviesCardList;