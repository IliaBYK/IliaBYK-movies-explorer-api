import { useContext, useState } from "react";
import { Link, useAsyncValue, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Container from "../Container/Container";
import { useAuth } from "../../hooks/useAuth";
import CurrentUserContext from "../../context/CurrentUserContext";

function Profile ({signOut, handleUpdateUser, user, error}) {
  //const {user} = useRouteLoaderData("user");
  /* const user = useAsyncValue(); */
  /* const {currentUser} = useContext(CurrentUserContext); */
  const [isSucces, setIsSucces] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
/*   const { signout, handleUpdateUser, user } = useAuth(); */
 /*  const navigate = useNavigate(); */

  const { values, handleChange } = useFormAndValidation({
    name: user?.name || " ",
    email: user?.email || " ",
  });

  /* function edit() {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  } */

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
    <Container class="profile" mix="profile" title={`Привет, ${user?.name || ""}!`}>
      <form className="profile__form" onSubmit={onSubmit}>
        <label className="profile__label">
          <input 
            type="text"
            name="name"
            minLength={2}
            maxLength={30}
            className="profile__input" 
            value={values.name}
            onChange={handleChange}
            disabled={!isEditing} />
          <span className="profile__placeholder">Имя</span>
        </label>
        <label className="profile__label">
          <input 
            className="profile__input" 
            value={values.email} 
            type="Email" 
            name="email"
            onChange={handleChange}
            disabled={!isEditing} />
          <span className="profile__placeholder">E-Mail</span>
        </label>
        {isSucces && <p className={"profile__message" + (error ? " profile__message_color_red" : "")}>{error ? error : "Изменения сохранены!"}</p>}
        <button className="profile__btn button" type="submit" /* onClick={edit} */>{isEditing? "Сохранить" : "Редактировать"}</button>
      </form>
      <Link to="/signin" className="profile__out link" onClick={signOut}>Выйти из аккаунта</Link>
    </Container>
  )
}

export default Profile;