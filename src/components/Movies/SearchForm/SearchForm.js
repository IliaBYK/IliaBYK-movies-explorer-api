import { useRef } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSubmit, value, searchTerm, /* handleChange, */ error, renderShorts }) {
  const ref = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    onSubmit(ref.current.value);
  };

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSearch} noValidate>
          <input
            type="text"
            className="search__input"
            placeholder="Фильм"
            defaultValue={searchTerm}
            ref={ref}
            /* onChange={handleChange} */
          />
          <button className="search__icon button" />
        </form>
        <p className="search__error">{error ? error : ""}</p>
        <FilterCheckbox onChange={renderShorts} value={value}/>
      </div>
      <div className="search__line" />
    </div>
  )
}

export default SearchForm;