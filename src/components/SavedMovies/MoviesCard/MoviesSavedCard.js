function MoviesSavedCard({ card }) {

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__description">{card.description}</div>
        <p className="card__time">{card.time}</p>
      </div>
      <img className="card__img" alt="Здесь будет название фильма" src={card.img} />
      <button className="card__btn card__btn_del button" />
    </div>
  )
}

export default MoviesSavedCard;