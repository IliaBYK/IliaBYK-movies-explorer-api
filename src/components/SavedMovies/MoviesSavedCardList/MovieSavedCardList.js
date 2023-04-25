import { useEffect, useState } from "react";
import { mainApi } from "../../../utils/MainApi";
import Container from "../../Container/Container";
import MoviesSavedCard from "../MoviesCard/MoviesSavedCard";
import FilterCheckbox from "../../Movies/FilterCheckbox/FilterCheckbox";
import MoviesMore from "../../Movies/MoviesMore/MoviesMore";
import Preloader from "../../Movies/Preloader/Preloader";

function MoviesSavedCardList() {

  const [savedMovies, setSavedMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [shorts, setShorts] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cardsClass, setCardsClass] = useState("cards");
  const [btnText, setbtnText] = useState("Ещё");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies();
    getShorts();
  }, []);

  const getMovies = () => {
    setIsLoading(true);
    mainApi.getMovies()
      .then((data) => {
      setSavedMovies(data);
    })
      .catch(err => setError(true))
      .finally(() => setIsLoading(false));
  }

  const getShorts = () => {
    setIsLoading(true);
    mainApi.getMovies()
      .then((data) => {
        const shortMovies = data.filter((movie) => movie.duration <= 40);
        setShortMovies(shortMovies);
      })
      .catch(err => setError(true))
      .finally(() => setIsLoading(false));
  }

  function moreMovies() {
    setCardsClass("cards cards__more");
    setbtnText("Меньше");

  }

  function lessMovies() {
    setCardsClass("cards");
    setbtnText("Ещё")
  }

  function toggleMovies() {
    if (cardsClass === "cards") {
      moreMovies();
    } else {
      lessMovies();
    }
  }

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const found = !searchTerm
      ? []
      : savedMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    setResults(found);
  }

  async function handleMovieDelete(movie) {
    try {
      await mainApi.deleteMovie(movie._id);
      const newMovies = savedMovies.filter((m) => m._id !== movie._id);
      setSavedMovies(newMovies);
      setResults(newMovies);
    } catch (err) {
      return console.error(err.message);
    }
  }

  const movieElements = results?.map((movieItem) => (<li key={movieItem._id}>
    <MoviesSavedCard
      key={movieItem._id}
      movie={movieItem}
      handleMovieDelete={() => handleMovieDelete(movieItem)} />
  </li>))

  const shortMovieElements = shortMovies?.map((movieItem) => (<li key={movieItem.movieId}>
    <MoviesSavedCard
      key={movieItem.movieId}
      movie={movieItem}
      handleMovieDelete={() => handleMovieDelete(movieItem)} />
  </li>))

  function onSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  function renderShorts() {
    !shorts ? setShorts(true) : setShorts(false);
  }


  return (
    <>
      <div className="search">
        <div className="search__container">
          <form className="search__form" onSubmit={onSubmit} noValidate>
            <input
              type="text"
              className="search__input"
              placeholder="Фильм"
              value={searchTerm}
              onChange={handleChange}
              required />
            <button className="search__icon button" />
          </form>
          <FilterCheckbox onChange={renderShorts} />
        </div>
        <div className="search__line" />
      </div>
      <Container class={cardsClass} component="div" componentUl="ul" mix="cards">
        {error ?
          <p className="cards__error">Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз</p> :
          (isLoading ? <Preloader /> :
            (shorts ? shortMovieElements : movieElements))}
      </Container>
      <MoviesMore onClick={toggleMovies} text={btnText} />
    </>
  )
}

export default MoviesSavedCardList;