import { NavLink } from "react-router-dom";

function Navigation ({isMain, loggedIn}) {

  const linkClassName = ({ isActive }) =>
    `${(isMain ? "header__navlink_logged_in" : "") }
     header__navlink link${isActive ? ' header__navlink_active' : ''}`;

  return (
    <>
      {loggedIn 
      ?
      <>
        <div className="header__links">
            <NavLink className={linkClassName} to="/movies">Фильмы</NavLink>
            <NavLink className={linkClassName} to="/saved-movies">Сохранённые фильмы</NavLink>
        </div>
          <NavLink className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </NavLink>
      </> 
      :
      <div className="header__navbar">
          <NavLink to="/signup" className="header__link link">Регистрация</NavLink>
          <NavLink to="/signin" className="header__link header__link_active link">Войти</NavLink>
      </div>}
    </>
  )
}

export default Navigation;






/*import { Link, Route, Routes } from "react-router-dom";

function Navigation ({loggedIn, isMain}) {
  return (
    <Routes>
      <Route path="/*" element={loggedIn ?
        <>
          <div className="header__links">
            <Link className={(isMain ? "header__navlink_logged_in" : "") + " header__navlink header__navlink_active link"} to="/movies">Фильмы</Link>
            <Link className={(isMain ? "header__navlink_logged_in" : "") + " header__navlink link"} to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
        </> :
        <div className="header__navbar">
          <Link to="/signup" className="header__link link">Регистрация</Link>
          <Link to="/signin" className="header__link header__link_active link">Войти</Link>
        </div>} />
      <Route path="/movies" element={
        <>
          <div className="header__links">
            <Link className="header__navlink header__navlink_active link" to="/movies">Фильмы</Link>
            <Link className="header__navlink link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
        </>
      }/>
      <Route path="/saved-movies" element={
        <>
          <div className="header__links">
            <Link className="header__navlink link" to="/movies">Фильмы</Link>
            <Link className="header__navlink header__navlink_active link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
        </>
      }/>
      <Route path="/profile" element={
        <>
          <div className="header__links">
            <Link className="header__navlink link" to="/movies">Фильмы</Link>
            <Link className="header__navlink link" to="/saved-movies">Сохранённые фильмы</Link>
          </div>
          <Link className="header__navlink link" to="/profile">
            <button className="header__navbtn button">Аккаунт</button>
          </Link>
        </>
      }/>
    </Routes>
  )
}

export default Navigation; */