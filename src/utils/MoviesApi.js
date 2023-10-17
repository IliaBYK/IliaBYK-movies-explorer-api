import Api from "./Api";

class MoviesApi extends Api {
  constructor() {
    super({
      baseUrl: "https://api.nomoreparties.co",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getMovies() {
    return this._getResponseMovies("/beatfilm-movies", "GET");
  }
}

export const moviesApi = new MoviesApi();
