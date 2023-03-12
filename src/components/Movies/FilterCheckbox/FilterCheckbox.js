function FilterCheckbox () {
  return (
    <fieldset className="filter__checkbox">
      <div className="filter__slide">
        <label className="filter__switch" htmlFor="checkbox">
          <input className="filter__check" type="checkbox" id="checkbox" />
          <div className="filter__slider filter__round"></div>
        </label>
      </div>
      <p className="filter__text">Короткометражки</p>
    </fieldset>
  )
}

export default FilterCheckbox;