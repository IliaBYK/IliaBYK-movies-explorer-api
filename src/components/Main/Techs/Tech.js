import Container from "../../Container/Container";

function Tech() {

  return (
    <section className="tech">
      <Container component="div" class="container" title="Технологии" mix="tech">
        <h3 className="tech__heading">7 технологий</h3>
        <p className="tech__text">На курсе веб-разработки мы освоили технологии, 
          которые применили в&#160;дипломном проекте.</p>
        <div className="tech__icons">
          <div className="tech__icon button">
            <span className="tech__span">HTML</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">CSS</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">JS</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">React</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">Git</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">Express.js</span>
          </div>
          <div className="tech__icon button">
            <span className="tech__span">mongoDB</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Tech;