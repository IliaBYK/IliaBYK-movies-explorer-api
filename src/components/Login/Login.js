import { useContext, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useAuth } from '../../hooks/useAuth';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { mainApi } from '../../utils/MainApi';

function Login({ error, onSubmit, loggedIn, setLoggedIn, handleSubmitLog }) {
  /* const { signin } = useAuth(); */
  /* const { setCurrentUser, setUserMovies } = useContext(CurrentUserContext); */

  const { values, errors, isValid, handleChange } = useFormAndValidation({
    email: "",
    password: "",
  });

  /* const getInitialData = useCallback(() => {
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
      .then(([userData, userMovie]) => {
        setCurrentUser(userData);
        setUserMovies(userMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if( loggedIn) getInitialData();
  }, [getInitialData, loggedIn]); */

  /* const handleSubmitLog = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setError('');
          return <Navigate to={"/movies"} replace />
        }
      })
      .catch((err) => {
        setError(err.error || err.message);
      })
  } */


  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitLog(values);
  }

  const spanErrorClassName = (error) => "register__error" + (error ? " register__error_active" : "");

  const inputErrorClassName = (error) => "register__input" + (error ? " register__input_type_error" : "");

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__set register__set_place_login">
          
          <label className="register__field">
            <span className="register__span">E-Mail</span>
            <input
              className={inputErrorClassName(errors.email)}
              value={values?.email}
              error={errors.email}
              onChange={handleChange}
              label="E-mail"
              type="email"
              name="email"
              required />
            <span className={spanErrorClassName(errors.email)}>{errors.email}</span>
          </label>

          <label className="register__field">
            <span className="register__span">Пароль</span>
            <input
              className={inputErrorClassName(errors.password)}
              value={values.password ?? ""}
              error={errors.password}
              onChange={handleChange}
              label="Пароль"
              type="password"
              name="password"
              required />
            <span className={spanErrorClassName(errors.password)}>{errors.password}</span>
          </label>
        </fieldset>
        <p className="register__error_login">{error ? error : ""}</p>
        <button
          disabled={!isValid}
          className={"register__btn button" + (isValid ? "" : " register__btn_disabled")}
          type="submit"
        >Войти</button>
      </form>
      <span className="register__span-link">Ещё не зарегистрированы?
        <Link className="register__link link" to="/signup"> Регистрация</Link>
      </span>
    </div>
  )
}

export default Login;