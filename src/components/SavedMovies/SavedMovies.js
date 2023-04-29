import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import Container from "../Container/Container";
import MoviesCardList from "../Movies/MoviesCardList/MovieCardList";

function SavedMovies() {

  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [error, setError] = useState("");

  //useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const movieQuery = searchParams.get("movie") || "";
  const shorts = searchParams.has("shorts");

  useEffect(() => {
    const params = JSON.parse(sessionStorage.getItem("savedParams"))
    params && setSearchParams(params);
  }, [setSearchParams])

  const getMovies = useCallback(() => {
    setIsLoading(true);
    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data.reverse());
      })
      .catch(err => setError((err)))
      .finally(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    getMovies();
    if(savedMovies)setBtnVisible(true);
  }, [])

  const handleMovieDelete = (movie) => {
    return mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMovies = savedMovies.filter((m) => m._id !== movie._id);
        setSavedMovies(newMovies);
      })
      .catch((err) => console.error(err.message))
  }

  const handleSearch = (value) => {
    try {
      if (!value) {
        setError("Введите ключевое слово");
        setBtnVisible(false);
        return;
      }
      getMovies();
      setError("");
      setBtnVisible(true);
      } catch (err) {
        setError(err)
        console.log(err);
      } 
  }

  return (
    <Container component="main" mix="movies" class="movies">
      <MoviesCardList
        movies={savedMovies}
        error={error}
        isLoading={isLoading}
        handleMovieDelete={handleMovieDelete}
        handleSearch={handleSearch}
        btnVisible={btnVisible}
        savedMovies={savedMovies}
        shorts={shorts}
        setSearchParams={setSearchParams}
        movieQuery={movieQuery}
      />
    </Container>
  )
}

export { SavedMovies };
