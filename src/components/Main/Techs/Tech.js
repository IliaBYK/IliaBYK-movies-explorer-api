import Container from "../../Container/Container";

function Tech() {

  return (
    <Container /* component="article" */ class="tech" title="Технологии" mix="tech">
      <h3 className="tech__heading">7 технологий</h3>
      <p className="tech__text">На курсе веб-разработки мы освоили технологии, 
        которые применили в&#160;дипломном проекте.</p>
      <ul className="tech__icons">
        <li className="tech__icon button">
          <span className="tech__span">HTML</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">CSS</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">JS</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">React</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">Git</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">Express.js</span>
        </li>
        <li className="tech__icon button">
          <span className="tech__span">mongoDB</span>
        </li>
      </ul>
    </Container>
  )
}

export default Tech;