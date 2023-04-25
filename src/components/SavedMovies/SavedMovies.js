import { useState, useEffect, useCallback, useMemo, useContext, Suspense } from "react";
import { Await, useSearchParams, defer, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import Container from "../Container/Container";
import MoviesCardList from "../Movies/MoviesCardList/MovieCardList";
import { useAuth } from "../../hooks/useAuth";
import CurrentUserContext from "../../context/CurrentUserContext";
import SearchFormHook from "../Movies/SearchForm/SearchFormHook";
import Preloader from "../Movies/Preloader/Preloader";

function SavedMovies(/* {handleMovieDelete, userMovies} */) {
  /* const {movies} = useLoaderData(); */
  /* const {movies} = useRouteLoaderData("movies"); */

  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  /* const [shorts, setShorts] = useState(false); */
  const [error, setError] = useState("");
  /* const [searchTerm, setSearchTerm] = useState(""); */

  //useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const movieQuery = searchParams.get("movie") || "";
  const shorts = searchParams.has("shorts");

  /* const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;
    const isShorts = form.shorts.checked;

    const params = {}

    if (query.length) params.movie = query;
    if (isShorts) params.shorts = true;

    setSearchParams(params);
  } */

  //useSearchParams

  /* useEffect(() => {
    const found = sessionStorage.getItem("found");
    const shorts = sessionStorage.getItem("shorts");
    const search = sessionStorage.getItem("search");
    /* found && setResults(JSON.parse(found)); */
    /* shorts && setShorts(shorts);
    search && setSearchTerm(search);
    /* setResults(movies);
  }, []) */

  useEffect(() => {
    /* const movies = sessionStorage.getItem("all_movies"); */
    const params = JSON.parse(sessionStorage.getItem("params"))
    /* movies && setSavedMovies(JSON.parse(movies)); */
    params && setSearchParams(params);
  }, [setSearchParams])

  /* const controllers = useMemo(
    () => ({
      duration: (value) => (shorts ? value <= 40 : value > 40),
    }),
    [shorts]
  );

  const filteredMovies = useMovieSearch(savedMovies, searchTerm, controllers); */
  /* const { userMovies } = useContext(CurrentUserContext);
  const getUserMovies = useCallback(() => setSavedMovies(userMovies), [userMovies]);

  useEffect(() => {
    getUserMovies();
  }, [getUserMovies]) */

  /* function renderShorts() {
    /* console.log(userMovies);
    !shorts ? setShorts(true) : setShorts(false);
    sessionStorage.setItem("shorts", !shorts);
  }

  const getShorts = () => {
    renderShorts();
    /* setShortMovies(savedMovies.filter(m => m.duration <= 40))
  }*/

  const getMovies = useCallback((/* value */) => {
    setIsLoading(true);
    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data.reverse());
      })
      .catch(err => setError((err)))
      .finally(() => setIsLoading(false));
    /* sessionStorage.setItem("search", value); */
  }, [])

  const handleMovieDelete = (movie) => {
    return mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMovies = savedMovies.filter((m) => m._id !== movie._id);
        setSavedMovies(newMovies);
      })
      .catch((err) => console.error(err.message))
      /* .finally(() => setResults(foundMovies))*/
  }

  /* const handleChange = (e) => {
    if (e.target.checkValidity()) {
      setSearchTerm(e.target.value);
      sessionStorage.setItem("search", e.target.value);
    }
  }; */

  const handleSearch = (value) => {
    try {
      if (!value) {
        setError("Введите ключевое слово");
        setBtnVisible(false);
        return;
      }
      getMovies(/* value */);
      setError("");
      setBtnVisible(true);
      /* const found = savedMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ); */
      } catch (err) {
        setError(err)
        console.log(err);
      } 
  }

  return (
    <Container component="main" mix="movies" class="movies">
      {/* <SearchFormHook
        movieQuery={movieQuery}
        shorts={shorts}
        setSearchParams={setSearchParams}
        error={error}
        handleSearch={handleSearch}
      /> */}
      {/* <Suspense fallback={<Preloader />}>
        <Await resolve={movies}> */}
          <MoviesCardList
            movies={savedMovies}
            error={error}
            isLoading={isLoading}
            handleMovieDelete={handleMovieDelete}
            handleSearch={handleSearch}
            /* value={searchTerm} */
            btnVisible={btnVisible}
            savedMovies={savedMovies}
            shorts={shorts}
            setSearchParams={setSearchParams}
            movieQuery={movieQuery}
          />
        {/* </Await>
      </Suspense> */}
    </Container>
  )
}

/* async function getMovies() {
  const res = await mainApi.getMovies();
  return res;
}

const savedMoviesLoader = async() => {
  return defer({
    movies: await getMovies(),
  })
} */

export { SavedMovies/* , savedMoviesLoader */ };

/*import { useState, useEffect, useCallback } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { useMoviesCount } from "../../hooks/useMoviesCount";
import Container from "../Container/Container";
import MoviesCardList from "./MoviesCardList/MovieCardList";

function Movies () {

  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  const [shorts, setShorts] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { items, loadMore } = useMoviesCount();

  useEffect(() => {
    if (sessionStorage.getItem("all_movies")) {
      const data = sessionStorage.getItem("all_movies");
      setMovies(JSON.parse(data));
    }
    mainApi.getMovies().then(res => setSavedMovies(res));
  }, []);

  useEffect(() => {
    const found = sessionStorage.getItem("found");
    const shorts = sessionStorage.getItem("shorts");
    const search = sessionStorage.getItem("search");
    found && setResults(JSON.parse(found));
    shorts && setShorts(JSON.parse(shorts));
    search && setSearchTerm(search);
    setResults(movies);
  }, [])

const getMovies = useCallback(() => {
  if (!sessionStorage.getItem("all_movies")) {
    setIsLoading(true);
    moviesApi.getMovies()
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
      .catch(err => setError(true))
      .finally(() => setIsLoading(false));
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
      setSavedMovies(
        savedMovies.filter((movie) => movie.movieId !== data.movieId)
      );
    });
};

const handleMovieDelete = useCallback((id) => {
  mainApi.deleteMovie(id)
    .then(() => {
      const newMovies = movies.filter((m) => m._id !== id);
      setSavedMovies(newMovies);
    })
    .catch((err) => console.error(err.message))
}, [movies])




const handleChange = (e) => {
  if (e.target.checkValidity()) {
    setSearchTerm(e.target.value);
    sessionStorage.setItem("search", e.target.value);
  }
};

const handleSearch = () => {
  try {
    setIsLoading(true);
    getMovies();
    const saved = () => {
      if (!searchTerm) {
        setError("Введите ключевое слово");
        setBtnVisible(false);
        return null;
      } else {
        setError("");
        setBtnVisible(true);
        return movies.filter(movie =>
          movie.nameRU.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
      }
    }
    setResults(saved);
    setIsLoading(false);
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
}

const search = () => {
  handleSearch();
  sessionStorage.setItem("found", JSON.stringify(results));
}

return (
  <Container component="main" mix="movies" class="movies">
    <MoviesCardList
      getMovies={getMovies}
      movies={movies}
      error={error}
      isLoad={isLoading}
      results={results}
      handleMovieDelete={handleMovieDelete}
      handleSave={handleSave}
      search={search}
      value={searchTerm}
      btnVisible={btnVisible}
      handleChange={handleChange}
      savedMovies={savedMovies}
      shortMovies={shortMovies}
    />
  </Container>
)
}

export default Movies; */