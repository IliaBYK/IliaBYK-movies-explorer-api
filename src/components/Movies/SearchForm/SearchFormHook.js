import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchFormHook({ movieQuery, shorts, setSearchParams, error, handleSearch }) {
  const [search, setSearch] = useState(movieQuery);
  const [checked, setChecked] = useState(shorts);

  useEffect(() => {
    const check = JSON.parse(sessionStorage.getItem("params"))?.shorts;
    check && setChecked(check);
    const filter = JSON.parse(sessionStorage.getItem("params"))?.movie;
    filter && setSearch(filter);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;
    const isShorts = form.shorts.checked;

    const params = {}

    if(query.length) params.movie = query;
    if(isShorts) params.shorts = true;

    sessionStorage.setItem("params", JSON.stringify(params));

    setSearchParams(params);
    handleSearch(search);
  }

  const onChange = (e) => {
    const query = search;
    const isShorts = e.target.checked;

    const params = {}

    if (query?.length) params.movie = query;
    if (isShorts) params.shorts = true;

    sessionStorage.setItem("params", JSON.stringify(params));

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
            onChange={e => setSearch(e.target.value)}
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