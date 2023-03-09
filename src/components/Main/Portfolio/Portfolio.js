function Portfolio () {
  return (
    <>
      <span className="portfolio">Портфолио</span>
      <div className="portfolio__links">
        <a 
          href="https://github.com/IliaBYK/how-to-learn" 
          className="portfolio__link link"
          >Статичный сайт<span className="portfolio__arrow">↗</span>
        </a>
        <div className="portfolio__line" />
        <a 
          href="https://iliabyk.github.io/Russian_travel/" 
          className="portfolio__link link"
          >Адаптивный сайт<span className="portfolio__arrow">↗</span>
        </a>
        <div className="portfolio__line" />
        <a 
          href="https://mesto-ibyk.nomoredomainsclub.ru/" 
          className="portfolio__link link"
          >Одностраничное приложение<span className="portfolio__arrow">↗</span>
        </a>
      </div>
    </>
  )
}

export default Portfolio;