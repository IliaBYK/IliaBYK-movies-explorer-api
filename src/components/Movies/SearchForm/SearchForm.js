import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" noValidate>
          <input type="text" className="search__input" placeholder="Фильм" required/>
          <button className="search__icon button" />
        </form>
        <FilterCheckbox />
      </div>
      <div className="search__line" />
    </div>
  )
}

export default SearchForm;