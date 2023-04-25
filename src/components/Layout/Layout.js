import { Outlet, useLocation, useLoaderData, defer, Await } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { mainApi } from '../../utils/MainApi';
import { checkToken } from '../../utils/Auth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader';

const Layout = ({ loggedIn, setLoggedIn, setError }) => {
  const {user} = useLoaderData();
  /* const [user, setUser] = useState(currentUser); */

  /* useEffect(() => {
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
  }, [user]) */

  return (
    <Suspense fallback={<Preloader />}>
      <Await resolve={user}>
        <div className="page">

          <Outlet />

        </div>
      </Await>
    </Suspense>
  )
}

async function getUser() {
  const res = await mainApi.getUserInfo();
  return res;
}

const userLoader = async() => {
  return defer({
    user: await getUser(),
  })
}

/* async function getMovies() {
  const res = await mainApi.getMovies();
  return res;
}

const savedMoviesLoader = async () => {
  //console.log({ request, params })

  return defer({
    movies: await getMovies(),
  })
} */


export { Layout, userLoader }