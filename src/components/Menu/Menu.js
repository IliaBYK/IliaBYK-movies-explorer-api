import { NavLink } from "react-router-dom"

function Menu ({isOpen, clickLink}) {

  const linkClassName = ({ isActive }) =>
    `menu__link link${isActive ? ' menu__link_active' : ''}`;

  return (
    <aside className={isOpen ? "menu menu__opened" : "menu"}>
      <div className="menu__container">
        <nav className="menu__nav">
          <ul className="menu__links">
            <li className="menu__link-item">
              <NavLink 
                to="/" 
                className={linkClassName} 
                onClick={clickLink}
              >
                Главная
              </NavLink>
            </li>
            <li className="menu__link-item">
              <NavLink 
                to="/movies" 
                className={linkClassName} 
                onClick={clickLink}
              >
                Фильмы
              </NavLink>
            </li>
            <li className="menu__link-item">
              <NavLink 
                to="/saved-movies" 
                className={linkClassName} 
                onClick={clickLink}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/profile" className="menu__btn_wrap">
          <button className="menu__btn header__navbtn button" onClick={clickLink}>Аккаунт</button>
        </NavLink>
      </div>
    </aside>
  )
}

export default Menu;