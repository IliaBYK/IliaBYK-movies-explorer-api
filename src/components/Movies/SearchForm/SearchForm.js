import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
  return (
    <div className="search">
      <div className="search__container">
        <fieldset className="search__form">
          <input type="text" className="search__input" placeholder="Фильм" />
          <div className="search__icon button" />
        </fieldset>
        <FilterCheckbox />
      </div>
      <div className="search__line" />
    </div>
  )
}

export default SearchForm;