export const BASE_URL = 'https://api.bitfilms.ibyk.nomoredomains.work';

function getResponseData(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const register = async (name, password, email) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email }),
  });
  return getResponseData(res);
};

const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return getResponseData(res);
};

const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return getResponseData(res);
};

export {register, authorize, checkToken};


/* import Api from "./Api";

class Auth extends Api {
  constructor() {
    super({
      url: "https://api.bitfilms.ibyk.nomoredomains.work/",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
    });
    const token = localStorage.getItem("token");
    if (token) this._options.headers.authorization = "Bearer " + token;
  }
  register(data) {
    return this._getResponse("signup", "POST", data)
  }

  authorize(data) {
    return this._getResponse("signin", "POST", data)
  }

  checkToken() {
    return this._options.headers.authorization;
  }
}

export const auth = new Auth(); */