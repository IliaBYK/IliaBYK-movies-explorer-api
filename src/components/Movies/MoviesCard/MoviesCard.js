import { useContext } from "react";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../../../context/CurrentUserContext";

function MoviesCard({ movie, deleteMovie, savedMovies, handleSave }) {
  const location = useLocation();

  const isSaved = savedMovies?.find(m => m.movieId === movie.movieId);

  const savedMoviesPage = location.pathname === "/saved-movies";

  const cardButtonClassName = `card__btn button${
    isSaved
      ? 
        savedMoviesPage 
        ?
        ' card__btn_del'
        :
        ' card__btn_save'
      : 
      ''
  }`;

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

  function handleSaveMovie() {
    handleSave(movie);
  }

  function handleDelete() {
    deleteMovie(isSaved);
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
      <button 
        onClick={
          isSaved ? () => handleDelete() : () => handleSaveMovie()
        }
        className={cardButtonClassName}
      >
        {isSaved ? "" : "Сохранить"}
      </button>
    </div>
  )
}

export default MoviesCard;