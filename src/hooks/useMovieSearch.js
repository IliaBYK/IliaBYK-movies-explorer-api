import { useState, useMemo } from "react";

/* export const useMovieSearch = (movies, value) => {
  const foundMovies = useMemo(() => {
    if (!value) {
      return null;
    } else {
      return movies?.filter(movie =>
        movie.nameRU.toLowerCase().includes(value.toLocaleLowerCase()) ||
        movie.nameEN.toLowerCase().includes(value.toLocaleLowerCase())
      );
    }
  }, [value, movies?.length]);

  const shorties = foundMovies?.filter(m => m.duration <= 40);

  return foundMovies;
} */

export const useMovieSearch = (movies, filter, shorties) => {
  const filteredMovies = useMemo(() => {
    if (!filter) return;
    /* return movies?.filter((movie) => {
      const en = movie.nameEN.toLowerCase().includes(filter.toLocaleLowerCase());
      const ru = movie.nameRU.toLowerCase().includes(filter.toLocaleLowerCase());
      return en || ru;
    }); */
    return movies?.filter(movie =>
      movie.nameRU.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      movie.nameEN.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [filter, movies?.length]);

  const controlledMovies = useMemo(() => {
    return filteredMovies?.filter(movie => shorties(movie)/* shorts ? movie.duration <= 40 : movie.duration > 40 */);
  }, [filteredMovies, shorties]);

  return controlledMovies;
};


/*const handleSearch = () => {
    if (!searchTerm) {
      setError("Введите ключевое слово");
      setBtnVisible(false);
      return;
    }
    setIsEmpty(false);
    /* getMovies();
setError("");
setBtnVisible(true);
const found = savedMovies.filter(movie =>
  movie.nameRU.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
  movie.nameEN.toLowerCase().includes(searchTerm.toLocaleLowerCase())
);
setResults(found);
setSearchTerm(searchTerm);
  } */