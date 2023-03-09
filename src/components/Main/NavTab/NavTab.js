import {
  Link,
} from "react-scroll";

function NavTab () {
  return (
    <div className="navtab__menu">
      <Link 
        to="about-project" 
        duration={1000}
        spy={true}
        smooth={true} 
        className="navtab__link navtab__link_place_menu link">О проекте</Link>
      <Link 
        to="tech" 
        duration={1000} 
        spy={true}
        smooth={true} 
        className="navtab__link navtab__link_place_menu link">Технологии</Link>
      <Link 
        to="student" 
        duration={1000}
        spy={true}
        smooth={true} 
        className="navtab__link navtab__link_place_menu link">Студент</Link>
    </div>
  )
}

export default NavTab;