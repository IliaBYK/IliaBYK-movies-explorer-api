import { Link, Outlet, useLocation } from "react-router-dom";
import Promo from "../Main/Promo/Promo";
import Navigation from "../Navigation/Navigation";
import Burger from "../Burger/Burger";

function Header({ loggedIn }) {

  const location = useLocation();

  const loginLoc = () => location.pathname === "/signin";
  const regLoc = () => location.pathname === "/signup";
  const isMain = () => location.pathname === "/";

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
