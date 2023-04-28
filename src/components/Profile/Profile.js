import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Container from "../Container/Container";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile ({signOut, handleUpdateUser, error}) {
  const currentUser = useContext(CurrentUserContext);
  
  const [isSucces, setIsSucces] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { values, handleChange } = useFormAndValidation({
    email: currentUser.email || "",
    name: currentUser.name || "",
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      try {
        handleUpdateUser(values);
        setIsSucces(true);
      } catch (err) {
        console.log(err || JSON.stringify(err));
        setIsSucces(false)
      }
    };
  }

  return (
    <Container class="profile" mix="profile" title={`Привет, ${currentUser.name || ""}!`}>
      <form className="profile__form" onSubmit={onSubmit}>
        <label className="profile__label">
          <input 
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            className="profile__input" 
            value={values?.name}
            onChange={handleChange}
            disabled={!isEditing}
            required />
          <span className="profile__placeholder">Имя</span>
        </label>
        <label className="profile__label">
          <input 
            className="profile__input" 
            value={values?.email} 
            type="email" 
            name="email"
            onChange={handleChange}
            disabled={!isEditing}
            required />
          <span className="profile__placeholder">E-mail</span>
        </label>
        {isSucces && <p className={"profile__message" + (error ? " profile__message_color_red" : "")}>{error ? error : "Изменения сохранены!"}</p>}
        <button className="profile__btn button" type="submit" >{isEditing? "Сохранить" : "Редактировать"}</button>
      </form>
      <Link to="/signin" className="profile__out link" onClick={signOut}>Выйти из аккаунта</Link>
    </Container>
  )
}

export default Profile;