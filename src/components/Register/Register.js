import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({ error, handleSubmitReg }) {
  const { values, errors, isValid, handleChange } = useFormAndValidation({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitReg(values);
  }

  const spanErrorClassName = (error) => "register__error" + (error ? " register__error_active" : "");

  const inputErrorClassName = (error) => "register__input" + (error ? " register__input_type_error" : "");

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__set">
          <label className="register__field">
            <span className="register__span">Имя</span>
            <input
              className="register__input"
              name="name"
              type="text"
              value={values.name ?? ""}
              error={errors.name}
              onChange={handleChange}
              label="Имя"
              minLength="2"
              maxLength="30"
              required />
            <span className={spanErrorClassName(errors.name)}>{errors.name}</span>
          </label>

          <label className="register__field">
            <span className="register__span">E-Mail</span>
            <input
              className={inputErrorClassName(errors.email)}
              value={values.email ?? ""}
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
        >Зарегистрироваться</button>
      </form>
      <span className="register__span-link">Уже зарегистрированы?
        <Link className="register__link link" to="/signin"> Войти</Link>
      </span>
    </div>
  )
}

export default Register;