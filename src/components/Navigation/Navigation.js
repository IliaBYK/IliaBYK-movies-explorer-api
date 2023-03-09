import { Link, Route } from "react-router-dom";

function Navigation () {
  return (
    <>
      <Route exact path="/">
        <div className="header__navbar">
          <Link to="/signup" className="header__link link">Регистрация</Link>
          <Link to="/signin" className="header__link header__link_active link">Войти</Link>
        </div>
      </Route>
      <Route path="/movies">
          <div className="header__links">
            <Link className="header__navlink header__navlink_active link" to="/movies">Фильмы</Link>
            <Link className="header__navlink link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
      </Route>
      <Route path="/saved-movies">
          <div className="header__links">
            <Link className="header__navlink link" to="/movies">Фильмы</Link>
            <Link className="header__navlink header__navlink_active link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
      </Route>
      <Route path="/profile">
          <div className="header__links">
            <Link className="header__navlink link" to="/movies">Фильмы</Link>
            <Link className="header__navlink link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
      </Route>
    </>
  )
}

export default Navigation;