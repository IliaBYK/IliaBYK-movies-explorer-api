import Container from "../../Container/Container";
import Portfolio from "../Portfolio/Portfolio";
import avatar from '../../../images/Avatar.jpg'

function AboutMe() {

  return (
    <Container title="Студент" class="about-me" mix="about-me">
        <div className="about-me__info">
          <article className="about-me__text-block">
            <p className="about-me__name">Илья</p>
            <h3 className="about-me__heading">Фронтенд-разработчик, 26 лет</h3>
            <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
              2015 года работал в компании «СКБ Контур». После того, как прошёл курс по
              веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a href="https://github.com/IliaBYK" className="about-me__git link">Github</a>
          </article>
          <img className="about-me__img" src={avatar} alt="Аватар студента" />
        </div>
        <Portfolio />
    </Container>
  )
}

export default AboutMe;