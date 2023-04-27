import { useState, useEffect, useCallback, Suspense, useContext } from "react";
import { useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import SearchFormHook from "./SearchForm/SearchFormHook";
import Preloader from "./Preloader/Preloader";
import Container from "../Container/Container";
import MoviesCardList from "./MoviesCardList/MovieCardList";
import { useAuth } from "../../hooks/useAuth";
import CurrentUserContext from "../../context/CurrentUserContext";

function Movies (/* {handleMovieDelete, handleSave} */) {
  /* const { movies, userMovies } = useLoaderData(); */
  const [movies, setMovies] = useState([]);
  /* const [results, setResults] = useState([]); */
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);
  /* const [shorts, setShorts] = useState(false); */
  const [error, setError] = useState("");

  //useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const movieQuery = searchParams.get("movie") || "";
  const shorts = searchParams.has("shorts");

  useEffect(() => {
    mainApi.getMovies().then(res => {
      setSavedMovies(res)
      /* console.log(res); */
    });
  }, [setSavedMovies]);

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

  /* const controllers = useMemo(
    () => ({
      duration: (value) => (shorts ? value <= 40 : value > 40),
    }),
    [shorts]
  );

  const foundMovies = useMovieSearch(movies, searchTerm, controllers); */
  /* const { setUserMovies } = useContext(CurrentUserContext); */
  /* const getUserMovies = useCallback(() => setSavedMovies(userMovies), [userMovies]); */

    /* useEffect(() => {
      mainApi.getMovies().then((res) => {
        setSavedMovies(res);
        setUserMovies(res);
      })
    }) */

  /* useEffect(() => {
    getUserMovies();
  }, [getUserMovies]) */

  /* function renderShorts() {
    /* console.log(userMovies); 
    !shorts ? setShorts(true) : setShorts(false);
    sessionStorage.setItem("shorts", shorts);
  }

  const getShorts = () => {
    renderShorts();
    setShortMovies(movies.filter(m => m.duration <= 40))
  }*/

  useEffect(() => {
    if (sessionStorage.getItem("all_movies")) {
      const data = sessionStorage.getItem("all_movies");
      setMovies(JSON.parse(data));
      setBtnVisible(true);
    }
    /* async function getMovies() {
      const res = await mainApi.getMovies();
      return setSavedMovies(res);
    }
    getMovies(); */
  }, []);

  useEffect(() => {
    const movies = sessionStorage.getItem("all_movies");
    const params = sessionStorage.getItem("params")
    movies && setMovies(JSON.parse(movies));
    params && setSearchParams(JSON.parse(params));
  }, [setSearchParams])

  const getMovies = useCallback((/* value */) => {
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
    /* sessionStorage.setItem("search", value); */
  }, [])

  /* const handleChange = (e) => {
    if (e.target.checkValidity()) {
      setSearchTerm(e.target.value);
      sessionStorage.setItem("search", e.target.value);
    }
  }; */

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
      getMovies(/* value */);
      setError("");
      setBtnVisible(true);
    /* const found = savedMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ); */
    } catch (err) {
      console.log(err);
      setError("Во время поиска произошла ошибка");
    }
  }

  /* const handleSearch = /* useMemo( () => {
    try {
      setMovies(foundMovies.saved);
      getMovies();
      setError("");
      setBtnVisible(true);
    } catch (err) {
      setError("Введите ключевое слово");
      setBtnVisible(false);
      console.error(err);
    }
  } */

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
        <Await resolve={{movies, userMovies}}> */}
          {/* {(resolvedMovies) => { */}
            <MoviesCardList
              movies={movies}
              error={error}
              isLoading={isLoading}
              handleMovieDelete={handleMovieDelete}
              handleSave={handleSave}
              handleSearch={handleSearch}
              btnVisible={btnVisible}
              /* handleChange={handleChange} */
              savedMovies={savedMovies}
              /* getShorts={getShorts} */
              shorts={shorts}
              setSearchParams={setSearchParams}
              movieQuery={movieQuery}
            /* setMovies={setMovies} */
            />
         {/*  }} */}
        {/* </Await>
      </Suspense> */}
    </Container>
  )
}


/* const getMovies = async () => {
    try {
      const data = await moviesApi.getMovies();
      data = data.map(({ created_at, updated_at, id, image, ...movie }) => {
        movie.thumbnail =
          `https://api.nomoreparties.co/${image?.formats?.thumbnail?.url}`;
        movie.image = `https://api.nomoreparties.co/${image?.url}`;
        movie.movieId = id;
        return movie;
      });
      sessionStorage.setItem("all_movies", JSON.stringify(data));
      return data;
    } catch(err) {
      console.log(err);
    }
} */




//async function getMovies () {
  /* return moviesApi.getMovies()
    .then((data) => {
      data = data.map(({ created_at, updated_at, id, image, ...movie }) => {
        movie.thumbnail =
          `https://api.nomoreparties.co/${image?.formats?.thumbnail?.url}`;
        movie.image = `https://api.nomoreparties.co/${image?.url}`;
        movie.movieId = id;
        return movie;
      });
/*       return data;
      //sessionStorage.setItem("all_movies", JSON.stringify(data));
    }) */
    /* try {
      if (!localStorage.getItem("all_movies")) {
        const data = await moviesApi.getMovies();
        const movies = data.map(({ created_at, updated_at, id, image, ...movie }) => {
          movie.thumbnail =
            `https://api.nomoreparties.co/${image?.formats?.thumbnail?.url}`;
          movie.image = `https://api.nomoreparties.co/${image?.url}`;
          movie.movieId = id;
          return movie;
        });
        localStorage.setItem("all_movies", JSON.stringify(movies));
        return movies;
      }
      return JSON.parse(localStorage.getItem("all_movies"));
    } catch (err) {
      console.log(err);
    } */
      //sessionStorage.setItem("all_movies", JSON.stringify(data));
      //console.log(data);
      /* return data; */
//}

/* const loader = async () => {
  return defer({
    movies: getMovies()
  })
} */

/* async function getUserMovies() {
  const res = await mainApi.getMovies();
  return res;
}

const moviesLoader = async () => {
  return defer({
    movies: await getMovies(),
    userMovies: await getUserMovies()
  })
} */

export { Movies/* , moviesLoader */ };


/*const [results, setResults] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [btnVisible, setBtnVisible] = useState(false);
  const [shorts, setShorts] = useState(false);
  const [error, setError] = useState(err);
  const [isLoading, setIsLoading] = useState(isLoad);
  const [searchTerm, setSearchTerm] = useState("");
  const {items, loadMore} = useMoviesCount();

  useEffect(() => {
    const found = sessionStorage.getItem("found");
    const shorts = sessionStorage.getItem("shorts");
    const search = sessionStorage.getItem("search");
    /* found && setResults(JSON.parse(found));
shorts && setShorts(JSON.parse(shorts));
search && setSearchTerm(search);
    setResults(movies);
  }, [])

function renderShorts() {
  !shorts ? setShorts(true) : setShorts(false);
  /* sessionStorage.setItem("shorts", shorts);
}

const getShorts = () => {
  const shorties = results.filter(movie => movie.duration <= 40);
  renderShorts();
  setShortMovies(shorties);
}

const handleChange = useCallback((e) => {
  if (e.target.checkValidity()) {
    setSearchTerm(e.target.value);
    sessionStorage.setItem("search", e.target.value);
  }
}, []);

const handleSearch = () => {
  setIsLoading(true);
  try {
    getMovies();
    const saved = () => {
      if (!searchTerm) {
        setError("Введите ключевое слово");
        setBtnVisible(false);
        return [];
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
  }
}

const search = () => {
  handleSearch();
  sessionStorage.setItem("found", JSON.stringify(results));
}

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

useEffect(() => {
  mainApi.getMovies().then(res => setSavedMovies(res));
}, []); */