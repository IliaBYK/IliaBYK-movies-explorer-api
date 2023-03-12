import { useState } from "react";
import cards from "../../../utils/cards";
import Container from "../../Container/Container";
import MoviesSavedCard from "../MoviesCard/MoviesSavedCard";
import MoviesMore from "../../Movies/MoviesMore/MoviesMore";

function MoviesSavedCardList () {

  const [cardsClass, setCardsClass] = useState("cards");
  const [btnText, setbtnText] = useState("Ещё");

  function moreMovies () {
    setCardsClass("cards cards__more");
    setbtnText("Меньше")
  }

  function lessMovies() {
    setCardsClass("cards");
    setbtnText("Ещё")
  }

  function toggleMovies () {
    if (cardsClass === "cards") {
      moreMovies();
    } else {
      lessMovies();
    }
  }

  const cardElements = cards.map((cardItem) => (<MoviesSavedCard key={cards.indexOf(cardItem)}
    card={cardItem}/>))

  return (
    <>
      <Container class={cardsClass} component="div" mix="cards">
        {cardElements}
      </Container>
      <MoviesMore onClick={toggleMovies} text={btnText}/>
    </>
  )
}

export default MoviesSavedCardList;