import { useLocation, Outlet } from "react-router-dom";
import Container from "../Container/Container";

function Footer () {
  const location = useLocation();

  const authLoc = 
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/profile";

  return (
    <Container title="Учебный проект Яндекс.Практикум х BeatFilm." 
      class={authLoc ? "footer_display_none" : "footer"} 
      component="footer" 
      mix="footer">
      <div className="footer__info">
        <span className="footer__date">@{new Date().getFullYear()}</span>
        <div className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
            className="footer__link link"
          >
            Яндекс.Практикум
          </a>
          <a href="https://github.com/" 
            target="_blank" 
            rel="noreferrer"
            className="footer__link link">
            Github
          </a>
        </div>
      </div>
    </Container>
  )
}

const FooterLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
};

export default FooterLayout;