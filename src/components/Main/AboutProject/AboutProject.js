import { Element } from "react-scroll";
import Container from "../../Container/Container";

function AboutProject() {

  return (
    <Container title="О проекте" class="about-project" mix="about-project">
        <Element name="about-project">
        <article className="about-project__info">
          <article className="about-project__text-block">
            <h3 className="about-project__heading">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </article>
          <article className="about-project__text-block">
            <h3 className="about-project__heading">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </article>
        <div className="about-project__diagram">
          <p className="about-project__time">1 неделя</p>
          <p className="about-project__time">4 недели</p>
          <p className="about-project__dir">Back-end</p>
          <p className="about-project__dir">Front-end</p>
        </div>
      </Element>
    </Container>
  )
}

export default AboutProject;