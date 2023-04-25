import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchFormHook({ movieQuery, shorts, setSearchParams, error, handleSearch }) {
  const [search, setSearch] = useState(movieQuery);
  const [checked, setChecked] = useState(shorts);

  /* useEffect(() => {
    sessionStorage.setItem("shorts", checked);
    const isShorts = sessionStorage.getItem("shorts");
    isShorts && setChecked(JSON.parse(isShorts));
  }, [checked]) */

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const query = form.search.value;
    const isShorts = form.shorts.checked;

    const params = {}

    if(query.length) params.movie = query;
    if(isShorts) params.shorts = true;

    setSearchParams(params);
    handleSearch(search);
  }

  const onChange = (e) => {
    const query = search;
    const isShorts = e.target.checked;

    const params = {}

    if (query.length) params.movie = query;
    if (isShorts) params.shorts = true;
    /* sessionStorage.setItem("params", JSON.stringify(params)); */

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
          {/* <fieldset className="filter__checkbox">
            <div className="filter__slide">
              <label className="filter__switch" htmlFor="checkbox">
                <input
                  className="filter__check"
                  type="checkbox"
                  name={"shorts"}
                  checked={checked}
                  onChange={e => setChecked(e.target.checked)}
                />
                <div className="filter__slider filter__round"></div>
              </label>
            </div>
            <p className="filter__text">Короткометражки</p>
          </fieldset> */}
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