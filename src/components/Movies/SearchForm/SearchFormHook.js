import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchFormHook({ movieQuery, shorts, setSearchParams, err, handleSearch }) {
  const [error, setError] = useState(err);
  const [search, setSearch] = useState(movieQuery);
  const [checked, setChecked] = useState(shorts);

  const location = useLocation();

  const moviesLoc = location.pathname === "/movies";
  const savedMoviesLoc = location.pathname === "/saved-movies";

  useEffect(() => {
    if(moviesLoc) {
      const check = JSON.parse(sessionStorage.getItem("params"))?.shorts;
      check && setChecked(check);
      const filter = JSON.parse(sessionStorage.getItem("params"))?.movie;
      filter && setSearch(filter);
    }
    if(savedMoviesLoc) {
      const check = JSON.parse(sessionStorage.getItem("savedParams"))?.shorts;
      check && setChecked(check);
      const filter = JSON.parse(sessionStorage.getItem("savedParams"))?.movie;
      filter && setSearch(filter);
    }
  }, [moviesLoc, savedMoviesLoc])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;
    const isShorts = form.shorts.checked;

    const params = {}

    if(query.length) params.movie = query;
    if(isShorts) params.shorts = true;

    if(moviesLoc) sessionStorage.setItem("params", JSON.stringify(params));
    if(savedMoviesLoc) sessionStorage.setItem("savedParams", JSON.stringify(params));

    setSearchParams(params);
    handleSearch(search);
  }

  const onChange = (e) => {
    const query = search;
    if (!search) {
      setError("Введите ключевое слово");
      return
    } else setError("");
    const isShorts = e.target.checked;

    const params = {}

    if (query?.length) params.movie = query;
    if (isShorts) params.shorts = true;

    if(moviesLoc) sessionStorage.setItem("params", JSON.stringify(params));
    if(savedMoviesLoc) sessionStorage.setItem("savedParams", JSON.stringify(params));

    setSearchParams(params);
  }

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" name="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <input
            type="search"
            name="search"
            className="search__input"
            placeholder="Фильм"
            onChange={e => {
              setSearch(e.target.value);
              e.target.value && setError("");
            }}
            value={search}
          />
          <button className="search__icon button" type="submit" />
          <FilterCheckbox 
            name={"shorts"} 
            onChange={(e) => {
              onChange(e);
              setChecked(e.target.checked);
            }} 
            checked={checked} />
        </form>
        <p className="search__error">{error ? error : ""}</p>
      </div>
      <div className="search__line" />
    </div>
  )
}

export default SearchFormHook;