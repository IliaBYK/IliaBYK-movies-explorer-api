import { useState } from "react";

function MoviesCard ({ card }) {
  const [isSaved, setIsSaved] = useState(false);
  const [btnClass, setBtnClass] = useState("card__btn_save");

  function save () {
    if (btnClass.includes("card__btn_save")) {
      setIsSaved(true);
      setBtnClass("card__btn");
    } else {
      setIsSaved(false);
      setBtnClass("card__btn_save");
    }
  }

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__description">{card.description}</div>
        <p className="card__time">{card.time}</p>
      </div>
      <img className="card__img" alt="Здесь будет название фильма" src={card.img} />
      <button onClick={save} className={btnClass + " button"}>{isSaved ? "" : "Сохранить"}</button>
    </div>
  )
}

export default MoviesCard;