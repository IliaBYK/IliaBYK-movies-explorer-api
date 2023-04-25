export default class Api {
  constructor({baseUrl, ...options}) {
    this._baseUrl = baseUrl;
    this._options = options;

    const token = localStorage.getItem("token");
    if (token) this._options.headers.authorization = "Bearer " + token;
  }

  _checkDataResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getResponse(url, method, body) {
    const token = localStorage.getItem("token");
    if (token) this._options.headers.authorization = "Bearer " + token;
    const options = { ...this._options, method };
    if (body)
      if (typeof body === "string") options.body = body;
      else options.body = JSON.stringify(body);
    return fetch(this._baseUrl + url, options).then(this._checkDataResponse);
  }
}

