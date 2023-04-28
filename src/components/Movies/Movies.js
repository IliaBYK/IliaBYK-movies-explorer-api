import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import Container from "../Container/Container";
import MoviesCardList from "./MoviesCardList/MovieCardList";

function Movies () {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [error, setError] = useState("");

  //useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const movieQuery = searchParams.get("movie") || "";
  const shorts = searchParams.has("shorts");

  useEffect(() => {
    mainApi.getMovies().then(res => {
      setSavedMovies(res)
          });
  }, [setSavedMovies]);

  useEffect(() => {
    if (sessionStorage.getItem("all_movies")) {
      const data = sessionStorage.getItem("all_movies");
      setMovies(JSON.parse(data));
      setBtnVisible(true);
    }
  }, []);

  useEffect(() => {
    const movies = sessionStorage.getItem("all_movies");
    const params = sessionStorage.getItem("params")
    movies && setMovies(JSON.parse(movies));
    params && setSearchParams(JSON.parse(params));
  }, [setSearchParams])

  const getMovies = useCallback(() => {
    if (!sessionStorage.getItem("all_movies")) {
      setIsLoading(true);
      return moviesApi.getMovies()
        .then((data) => {
          data = data.map(({ created_at, updated_at, id, image, ...movie }) => {
            movie.thumbnail =
              `https://api.nomoreparties.co/${image?.formats?.thumbnail?.url}`;
            movie.image = `https://api.nomoreparties.co/${image?.url}`;
            movie.movieId = id;
            return movie;
          });
          setMovies(data);
          sessionStorage.setItem("all_movies", JSON.stringify(data));
        })
        .catch(err => setError(JSON.stringify(err) || err))
        .finally(() => setIsLoading(false));
    } else {
      const data = sessionStorage.getItem("all_movies");
      setMovies(JSON.parse(data));
    }
  }, [])

  const handleSave = (data) => {
    setSavedMovies([...savedMovies, data]);
    mainApi
      .saveMovie(data)
      .then((res) => {
        setSavedMovies((movs) =>
          movs.map((mov) => {
            if (mov.movieId === res.movieId) return { ...mov, _id: res._id };
            return mov;
          })
        )
      })
      .catch((err) => {
        setError("Не удалось сохранить фильм")
        setSavedMovies(
          savedMovies.filter((movie) => movie.movieId !== data.movieId)
        );
      });
  };

  const handleMovieDelete = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMovies = savedMovies.filter((m) => m.movieId !== movie.movieId);
        setSavedMovies(newMovies);
        setError("");
      })
      .catch((err) => {
        setError("Не удалось удалить фильм")
        console.log(err)
      })
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
      console.log(err);
      setError("Во время поиска произошла ошибка");
    }
  }

  return (
    <Container component="main" mix="movies" class="movies">
      <MoviesCardList
        movies={movies}
        error={error}
        isLoading={isLoading}
        handleMovieDelete={handleMovieDelete}
        handleSave={handleSave}
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

export { Movies };
