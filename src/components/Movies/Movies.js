import Container from "../Container/Container";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MovieCardList";

function Movies () {
  return (
    <Container component="main" mix="movies" class="movies">
      <SearchForm />
      <MoviesCardList />
    </Container>
  )
}

export default Movies;