import { Link, Route } from "react-router-dom"

function Menu ({isOpen}) {
  return (
    <div className={isOpen ? "menu menu__opened" : "menu"}>
      <div className="menu__container">
        <div className="menu__nav">
          <Route exact path="/movies">
            <ul className="menu__links">
              <li className="menu__link-item">
                <Link to="/" className="menu__link link">Главная</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/movies" className="menu__link menu__link_active link">Фильмы</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/saved-movies" className="menu__link link">Сохранённые фильмы</Link>
              </li>
            </ul>
          </Route>
          <Route exact path="/saved-movies">
            <ul className="menu__links">
              <li className="menu__link-item">
                <Link to="/" className="menu__link link">Главная</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/movies" className="menu__link link">Фильмы</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/saved-movies" className="menu__link menu__link_active link">Сохранённые фильмы</Link>
              </li>
            </ul>
          </Route>
          <Route exact path="/">
            <ul className="menu__links">
              <li className="menu__link-item">
                <Link to="/" className="menu__link link">Главная</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/movies" className="menu__link link">Фильмы</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/saved-movies" className="menu__link link">Сохранённые фильмы</Link>
              </li>
            </ul>
          </Route>
          <Route exact path="/profile">
            <ul className="menu__links">
              <li className="menu__link-item">
                <Link to="/" className="menu__link link">Главная</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/movies" className="menu__link link">Фильмы</Link>
              </li>
              <li className="menu__link-item">
                <Link to="/saved-movies" className="menu__link link">Сохранённые фильмы</Link>
              </li>
            </ul>
          </Route>
        </div>
        <Link to="/profile" className="menu__btn_wrap">
          <button className="menu__btn header__navbtn button">Аккаунт</button>
        </Link>
      </div>
    </div>
  )
}

export default Menu;