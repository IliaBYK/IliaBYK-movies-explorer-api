import { useMemo } from "react";

export const useMovieSearch = (movies, filter, shorties) => {
  const filteredMovies = useMemo(() => {
    if (!filter) return;
    return movies?.filter(movie =>
      movie.nameRU.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      movie.nameEN.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [filter, movies?.length]);

  const controlledMovies = useMemo(() => {
    return filteredMovies?.filter(movie => shorties(movie));
  }, [filteredMovies, shorties]);

  return controlledMovies;
};
