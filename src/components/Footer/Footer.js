import Container from "../Container/Container";

function Footer () {
  return (
    <Container title="Учебный проект Яндекс.Практикум х BeatFilm." 
      class="footer" 
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

export default Footer;