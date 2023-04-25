import { Await, useLoaderData, defer } from 'react-router-dom';
import { createContext, useEffect, Suspense, useState } from 'react';
import { checkToken } from '../../utils/Auth';
import { authorize, register } from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import Preloader from '../Movies/Preloader/Preloader';

const AuthContext = createContext();

const AuthProvider = ({ 
  children, 
  setLoggedIn, 
  loggedIn, 
  setError 
  }) => {

  const [user, setUser] = useState({});
  /* const [savedMovies, setSavedMovies] = useState([]); */

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        setLoggedIn(true);
      }).catch(err => {
        setLoggedIn(false);
        setError(err.code === 401 ? "Необходима авторизация" : JSON.stringify(err));
        console.log(err)
      });
    }
  }, [loggedIn])

  useEffect(() => {
    async function getUser() {
      const res = await mainApi.getUserInfo();
      return setUser(res);
    }
    if(loggedIn) getUser()
  }, [loggedIn])

  /* async function getMovies() {
    const res = await mainApi.getMovies();
    return setSavedMovies(res);
  } */

  /* const getMovies = () => {
    mainApi.getMovies().then(res => setUserMovies(res));
  }*/

  /* useEffect(() => {
    getMovies();
  }, []) */

  const signin = (values, cb) => {
    if (!values.email || !values.password) {
      return;
    }
    authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setError('');
        }
        setUser(res.user);
      })
      .catch((err) => {
        setError(err);
      })
    cb();
  }

  /* const signup = (newUser, cb) => {
    setUser(newUser);
    cb();
  } */

  const signup = (values, cb) => {
    register(values.name, values.password, values.email)
      .then((res) => {
        if (res.statusCode !== 400) {
          setError('');
        }
      }).catch(err => {
        setError(err)
        console.log(err)
      });
    cb();
  }

  const signout = (cb) => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setUser(null);
    cb();
  }

  function handleUpdateUser(inputs) {
    return mainApi.setUserInfo(inputs)
      .then((user) => {
        setUser(user);
      })
      .catch(err => {
        setError(err)
        console.log(err)
      });
  }

  /* useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
    const log = JSON.parse(localStorage.getItem("loggedIn"));
    log && setLoggedIn(log);
  }, [loggedIn, setLoggedIn]); */

  const value = { user, signin, signup, signout, handleUpdateUser }

  return (
    <AuthContext.Provider value={value}>
      <div className="page">

        {children}

      </div>
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }