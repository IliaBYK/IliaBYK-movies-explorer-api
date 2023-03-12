import { Link, Route } from "react-router-dom";
import Promo from "../Main/Promo/Promo";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

function Header() {

  return (
    <>
      <Route exact path="/">
        <header className="header">
          <nav className="header__head">
            <Link to="/">
              <div className="header__logo button" />
            </Link>
            <Navigation />
          </nav>
          <Promo />
        </header>
      </Route>
      <Route exact path="/signup">
        <header className="header_place_auth">
          <Link to="/">
            <div className="header__logo header__logo_place_auth button" />
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
        </header>
      </Route>
      <Route exact path="/signin">
        <header className="header_place_auth">
          <Link to="/">
            <div className="header__logo header__logo_place_auth button" />
          </Link>
          <h2 className="register__title">Рады видеть!</h2>
        </header>
      </Route>
      <Route exact path="/movies">
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
          </Link>
          <Burger />
          <Navigation />
        </header>
      </Route>
      <Route exact path="/saved-movies">
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
          </Link>
          <Burger />
          <Navigation />
        </header>
      </Route>
      <Route exact path="/profile">
        <header className="header header_place_movies">
          <Link to="/">
            <div className="header__logo button" />
          </Link>
          <Burger />
          <Navigation />
        </header>
      </Route>
    </>
  )
}

export default Header;
