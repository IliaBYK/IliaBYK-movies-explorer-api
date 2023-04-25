/* import { Link, Route, Routes, useLocation } from "react-router-dom";
import Promo from "../Main/Promo/Promo";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

function Header({ loggedIn, isMain }) {

  const location = useLocation();

  const loginLoc = () => location.pathname === "/signin";
  const regLoc = () => location.pathname === "/signup";

  return (
    <>
      <>
        <header className={(!isMain ? "header_place_movies" : "") + " header"}>
          <nav className="header__head">
            <Link to="/">
              <div className={(!loginLoc && !regLoc ? "header__logo_place_auth " : "") + " header__logo button"} />
            </Link>
            {!loginLoc && !regLoc ? <Navigation loggedIn={loggedIn} isMain={isMain}/> : null}
          </nav>
          {isMain ? <Promo /> : null}
        </header>
      </>
      <Route exact path="/signup" element={
        <header className="header_place_auth">
          <Link to="/">
            <div className="header__logo header__logo_place_auth button" />
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
        </header>
      }/>
      <Route exact path="/signin" element={
        <header className="header_place_auth">
          <Link to="/">
            <div className="header__logo header__logo_place_auth button" />
          </Link>
          <h2 className="register__title">Рады видеть!</h2>
        </header>}
      />
      <Route path="/movies" element={
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
          </Link>
          <Burger />
          <Navigation loggedIn={loggedIn} isMain={isMain} />
        </header>}
      />
      <Route path="/saved-movies" element={
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
         </Link>
         <Burger />
          <Navigation loggedIn={loggedIn} isMain={isMain} />
        </header>}
      />
      <Route path="/profile" element={
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
          </Link>
          <Burger />
          <Navigation loggedIn={loggedIn} isMain={isMain} />
        </header>}
      />
    </>
  )
}

export default Header; */


import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Promo from "../Main/Promo/Promo";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

function Header({ loggedIn }) {
  /* const [isMain, setIsMain] = useState(false); */

  const location = useLocation();

  const loginLoc = () => location.pathname === "/signin";
  const regLoc = () => location.pathname === "/signup";
  const isMain = () => location.pathname === "/";

  /* useEffect(() => setIsMain(location.pathname === "/"), [location, location.pathname]) */
  const authLoc = loginLoc() || regLoc();

  return (
    <header className={(isMain() ? "" : "header_place_movies") + " header" + (authLoc ? " header_place_auth" : "")}>
      <nav className={"header__head" + (authLoc ? " header__head_place_auth " : "")}>
        <Link to="/">
          <div className={(authLoc ? " header__logo_place_auth " : "") + " header__logo button"} />
        </Link>
        {!authLoc 
        ?
        <Navigation loggedIn={loggedIn} isMain={isMain()} />
        :
        <h2 className="register__title">Добро пожаловать!</h2>
        }
        <Burger isMain={isMain()}/>
      </nav>
      {isMain() ? <Promo /> : null}
    </header>
  )
}

const HeaderLayout = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Outlet />
    </>
  )
};

export default HeaderLayout;
