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

/* class MoviesApi {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _checkDataResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getResponse(url, method, body) {
    const options = { ...this._options, method };
    if (body)
      if (typeof body === "string") options.body = body;
      else options.body = JSON.stringify(body);
    return fetch(this._baseUrl + url, options).then(this._checkDataResponse);
  }

  getMovies() {
    return this._getResponse("/beatfilm-movies", "GET");
  }
}

export const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
}); */