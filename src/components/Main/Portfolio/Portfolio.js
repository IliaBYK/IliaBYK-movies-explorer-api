function Portfolio () {
  return (
    <aside className="portfolio">
      <span className="portfolio__span">Портфолио</span>
      <ul className="portfolio__links">
        <li className="portfolio__link-item">
          <a
            href="https://github.com/IliaBYK/how-to-learn"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >Статичный сайт<span className="portfolio__arrow">↗</span>
          </a>
          <div className="portfolio__line" />
        </li>
        <li className="portfolio__link-item">
          <a
            href="https://iliabyk.github.io/Russian_travel/"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >Адаптивный сайт<span className="portfolio__arrow">↗</span>
          </a>
          <div className="portfolio__line" />
        </li>
        <li className="portfolio__link-item">
          <a
            href="https://mesto-ibyk.nomoredomainsclub.ru/"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer"
          >Одностраничное приложение<span className="portfolio__arrow">↗</span>
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default Portfolio;