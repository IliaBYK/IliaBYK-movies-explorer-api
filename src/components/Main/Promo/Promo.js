import { Link } from "react-scroll";
import Container from "../../Container/Container";

function Promo () {
  return (
    <Container class="promo" component="div" mix="promo">
      <div className="promo__heading">
        <h1 className="promo__title">Учебный проект студента
          факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">Листайте ниже, 
          чтобы узнать больше про этот проект и его создателя.</p>
        <Link
          to="about-project"
          duration={1000}
          spy={true}
          smooth={true}
          className="promo__link link">Узнать больше</Link>
      </div>
    </Container>
  )
}

export default Promo;