function MoviesSavedCard({ movie, handleMovieDelete }) {

  const movieTime = (time) => {
    let duration;
    if (time > 60) {
      const hours = Math.floor(time / 60);
      const mins = time % 60;
      duration = `${hours}ч${mins}м`
      return duration;
    } else {
      return duration = `${time}м`;
    }
  }

  function handleDeleteClick() {
    handleMovieDelete(movie);
  }

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__description">{movie.nameRU}</div>
        <p className="card__time">{movieTime(movie.duration)}</p>
      </div>
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__img"
          alt={movie.nameRU}
          src={movie.image}
        />
      </a>
      <button className="card__btn card__btn_del button" onClick={handleDeleteClick}/>
    </div>
  )
}

export default MoviesSavedCard;