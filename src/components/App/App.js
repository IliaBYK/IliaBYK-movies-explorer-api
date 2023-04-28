import { useState, useEffect } from 'react';
import {
   Route, 
   Routes, 
   useNavigate, 
   Navigate, 
  } from 'react-router-dom';
/* import { Helmet } from 'react-helmet'; */
import { mainApi } from '../../utils/MainApi';
import {authorize, register, checkToken} from "../../utils/Auth";
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import './App.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import Modal from '../Modal/Modal';
import HeaderLayout from '../Header/Header';
import FooterLayout from '../Footer/Footer';
/* import { Helmet } from 'react-helmet'; */

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("login"));
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        setLoggedIn(true);
        localStorage.setItem("login", JSON.stringify(true));
        setCurrentUser(res);
        setError("");
      }).catch(err => {
        setLoggedIn(false);
        localStorage.setItem("login", JSON.stringify(false));
        setError(err.code === 401 ? "Необходима авторизация" : JSON.stringify(err));
        console.log(err)
      });
    }
  }, [])

  const handleSubmitReg = (values) => {
    register(values.name, values.password, values.email)
      .then((res) => {
        if (res.statusCode !== 400) {
          authorize(values.email, values.password)
            .then((res) => {
              if (res.token) {
                checkToken(res.token);
                localStorage.setItem('token', res.token);
                setLoggedIn(true);
                localStorage.setItem("login", JSON.stringify(true));
                setError('');
              }
              setCurrentUser(res.user);
              navigate("/movies")
            })
        }
      }).catch(err => {
        setError(
          err 
          || 
          err.statusCode === 409 
          ? 
          JSON.stringify(
              err.statusCode === 400
              ?
              "Введены невалидные данные"
              :
              err.message) 
          : 
          JSON.stringify(err)
        )
      })
  }

  const handleSubmitLog = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          checkToken(res.token);
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          localStorage.setItem("login", JSON.stringify(true));
          setError('');
        }
        setCurrentUser(res.user);
        navigate("/movies")
      })
      .catch((err) => {
        setError(
          err 
          || 
          err.statusCode === 409 
          ? 
          JSON.stringify(
              err.statusCode === 400
              ?
              "Введены невалидные данные"
              :
              err.message) 
          : 
          JSON.stringify(err)
        )
      })
  }

  /* const SetLang = () => {
    return (
      <Helmet>
        <html lang="ru" />
        <title>Beatfilms</title>
      </Helmet>
    )
  } */

  function handleUpdateUser(inputs) {
    if(inputs.name === currentUser.name && inputs.email === currentUser.email) {
      setError("Данные не изменены");
      return;
    } else {
      return mainApi.setUserInfo(inputs)
      .then((user) => {
        setCurrentUser(user);
        setError("");
      })
      .catch(err => {
        setError(err || JSON.stringify(err) || err === "Ошибка: 400" ? "Введены невалидные данные" : "")
        console.log(err)
      });
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    localStorage.removeItem("login");
    localStorage.clear();
    sessionStorage.clear();
    setCurrentUser({});
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* <SetLang /> */}
        <Routes>
          <Route element={<HeaderLayout loggedIn={loggedIn} />}>
            <Route element={<FooterLayout />}>
              <Route
                path="/saved-movies"
                errorElement={<Modal />}
                element={
                  <ProtectedRoute
                    component={SavedMovies}
                    loggedIn={loggedIn}
                  />
                }
              
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    component={Movies}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    user={currentUser}
                    signOut={handleSignOut}
                    handleUpdateUser={handleUpdateUser}
                    error={error}
                  />
                }
              />
              <Route
                index
                path="/"
                element={
                  <Main loggedIn={loggedIn} />
                }
              />
              <Route
                path="/*"
                element={<NotFound />}
              />
              <Route
                path="/signup"
                element={
                  loggedIn
                    ?
                    <Navigate to={'/'} />
                    :
                    <Register
                      handleSubmitReg={handleSubmitReg}
                      loggedIn={loggedIn}
                      error={error}
                      setError={setError}
                    />
                }
              />
              <Route
                path="/signin"
                   element={
                  loggedIn
                    ?
                    <Navigate to={'/'} />
                    :
                    <Login
                      handleSubmitLog={handleSubmitLog}
                      loggedIn={loggedIn}
                      error={error}
                      setError={setError}
                      setLoggedIn={setLoggedIn}
                    />
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
