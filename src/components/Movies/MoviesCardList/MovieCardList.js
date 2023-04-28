import { useMovieSearch } from "../../../hooks/useMovieSearch";
import Container from "../../Container/Container";
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";
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
  btnVisible,
  shorts,
  setSearchParams,
  movieQuery,
  }) {

  const {items, loadMore} = useMoviesCount();

  const shorties = (movie) => shorts ? movie.duration <= 40 : movie.duration > 40;
  const moviesFilter = useMovieSearch(movies, movieQuery, shorties);

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

  return (
    <>
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
        : 
          (isLoading ? <Preloader /> : 
          (movieElements))}
      </Container>
      <p>{movieElements?.length === 0 && movies?.length !== 0 && !error && movieQuery && !isLoading && "Ничего не найдено..."}</p>
      {btnVisible && items < movies?.length && items < moviesFilter?.length && !isLoading && <MoviesMore onClick={loadMore} text="Ещё" /> }
    </>
  )
}

export default MoviesCardList;