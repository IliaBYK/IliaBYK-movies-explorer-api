import Container from "../Container/Container";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesSavedCardList from "./MoviesSavedCardList/MovieSavedCardList";

function SavedMovies() {
  return (
    <Container component="main" mix="movies" class="movies">
      <SearchForm />
      <MoviesSavedCardList />
    </Container>
  )
}

export default SavedMovies;