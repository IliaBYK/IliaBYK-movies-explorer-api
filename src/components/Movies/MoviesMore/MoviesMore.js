function MoviesMore ({onClick, text}) {
  return (
    <div className="more">
      <button className="more__btn button" onClick={onClick}>{text}</button>
    </div>
  )
}

export default MoviesMore;