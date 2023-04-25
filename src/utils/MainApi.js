import Api from "./Api";

class MainApi extends Api {
  constructor() {
    super({
      baseUrl: "https://api.bitfilms.ibyk.nomoredomains.work/",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = localStorage.getItem("token");
    if (token) this._options.headers.authorization = "Bearer " + token;
  }
  
  getMovies() {
  return this._getResponse("movies", "GET")
  }

  getUserInfo() {
    return this._getResponse("users/me", "GET")
  }

  setUserInfo(data) {
    return this._getResponse("users/me", "PATCH", data)
  }

  saveMovie(data) {
    return this._getResponse("movies", "POST", data)
  }

  deleteMovie(id) {
    return this._getResponse("movies/" + id, "DELETE")
  }
}

export const mainApi = new MainApi();
