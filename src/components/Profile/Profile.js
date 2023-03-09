import { Link } from "react-router-dom";
import Container from "../Container/Container";

function Profile () {
  return (
    <Container class="profile" mix="profile" title="Привет, Виталий!">
      <form className="profile__form">
        <label className="profile__label">
          <input className="profile__input" />
          <span className="profile__placeholder">Имя</span>
        </label>
        <label className="profile__label">
          <input className="profile__input" />
          <span className="profile__placeholder">E-Mail</span>
        </label>
      </form>
      <button className="profile__btn button">Редактировать</button>
      <Link to="/signin" className="profile__out link">Выйти из аккаунта</Link>
    </Container>
  )
}

export default Profile;