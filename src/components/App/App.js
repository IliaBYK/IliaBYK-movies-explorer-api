import { useState, useEffect, useCallback, Suspense } from 'react';
import {
   Route, 
   Routes, 
   useNavigate, 
   useLocation, 
   Navigate, 
   RouterProvider, 
   createBrowserRouter, 
   createRoutesFromElements,
   defer,
   Await,
   useLoaderData,
   useRouteLoaderData
  } from 'react-router-dom';
/* import { Helmet } from 'react-helmet'; */
import { mainApi } from '../../utils/MainApi';
import {authorize, register, checkToken} from "../../utils/Auth";
import { AuthContext, AuthProvider } from '../ProtectedRoute/AuthProvider';
import { userLoader } from '../Layout/Layout';
import { Layout } from '../Layout/Layout';
import Preloader from '../Movies/Preloader/Preloader';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteLoggedIn from '../ProtectedRoute/ProtectedRouteLoggedIn';
import { Movies/* , moviesLoader */ } from '../Movies/Movies';
import { SavedMovies/* , savedMoviesLoader */ } from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import './App.css';
import { useAuth } from '../../hooks/useAuth';
import CurrentUserContext from '../../context/CurrentUserContext';
import Modal from '../Modal/Modal';
import HeaderLayout from '../Header/Header';
import FooterLayout from '../Footer/Footer';
import RequireAuth from '../ProtectedRoute/RequireAuth';
import { Helmet } from 'react-helmet';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  /* const [savedMovies, setSavedMovies] = useState([]); */

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        setError("");
      }).catch(err => {
        setLoggedIn(false);
        setError(err.code === 401 ? "Необходима авторизация" : JSON.stringify(err));
        console.log(err)
      });
    }
  }, [])

  /* useEffect(() => {
    if(loggedIn) mainApi.getUserInfo().then(res => setCurrentUser(res));
  }, [loggedIn]) */

  /* useEffect(() => {
    if(loggedIn) mainApi.getMovies().then(setSavedMovies)
  }, [loggedIn]) */

  /* const getInitialData = useCallback(() => {
    Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
      .then(([userData, userMovies]) => {
        setCurrentUser(userData);
        setSavedMovies(userMovies);
      })
      .catch((err) => {
        setError(err)
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(loggedIn) getInitialData();
  }, [loggedIn]); */

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
              {/* <Route
                loader={loggedIn && userLoader}
                id={"user"}
                path="/"
                errorElement={<Modal />} 
                element={
                  loggedIn
                  ?
                  <Layout
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    setError={setError}
                  />
                  :
                  <Navigate to="/signin" />
                }
              > */}
              <Route
                /* loader={loggedIn && savedMoviesLoader}
                id="savedMovies" */
                path="/saved-movies"
                errorElement={<Modal />}
                element={
                  <ProtectedRoute
                    /* path="/saved-movies" */
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    /* handleMovieDelete={handleMovieDelete}
                    userMovies={savedMovies} */
                  />
                }
              
              />
              {/* <Route 
                path="saved-movies"
                element={
                  <RequireAuth>
                    <SavedMovies />
                  </RequireAuth>
                }/> */}
              <Route
                /* loader={loggedIn && moviesLoader} */
                //id={"movies"}
                path="/movies"
                /* errorElement={<Modal />} */
                element={
                  <ProtectedRoute
                    component={Movies}
                    loggedIn={loggedIn}
                    /* handleMovieDelete={handleMovieDelete}
                    handleSave={handleSave}
                    savedMovies={savedMovies} */
                  />
                }
              /* loader={loader} */
              />
              <Route
                path="/profile"
                /* errorElement={<Modal />} */
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
              {/* <Route
                path="/signin"
                element={
                  <ProtectedRouteLoggedIn
                    component={Login}
                    /* onSubmit={handleSubmitLog}
                    loggedIn={loggedIn}
                    error={error}
                    setError={setError}
                    setLoggedIn={setLoggedIn}
                  />
                }
                /> */}
              {/*  <Route
                path="signin"
                errorElement={<Modal />}
                element={
                  loggedIn
                    ?
                    (<Navigate to={'/movies'} />)
                    :
                    (<Login
                      loggedIn={loggedIn}
                      error={error}
                      /* setError={setError}
                      setLoggedIn={setLoggedIn}
                    />
                    )
                }
                  /> */}
              {/* <Route
                path="signup"
                element={
                  <ProtectedRouteLoggedIn
                    component={Register}
                    onSubmit={handleSubmitReg}
                    loggedIn={loggedIn}
                    error={error}
                  />
                }
                /> */}
              {/* <Route
                path="/signup"
                errorElement={<Modal />}
                element={
                  loggedIn ? (
                    <Navigate to={'/movies'} />
                  ) : (
                    <Register
                      loggedIn={loggedIn}
                      error={error}
                      setError={setError}
                    />
                  )
                }
                /> */}
              <Route
                path="/*"
                element={<NotFound />}
              />
              {/* </Route> */}
              <Route
                path="/signup"
                /* errorElement={<Modal />} */
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
                /* errorElement={<Modal />} */
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
