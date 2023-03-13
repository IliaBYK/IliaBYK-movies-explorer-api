import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';

function App() {

  function HardCoded () {
    return (
      <Helmet htmlAttributes={{ lang: 'ru' }}>
        <title>Bitfilms</title>
      </Helmet>
    )
    }

  return (
    <div className="page">
      <HardCoded />
      <Header />

      <Switch>
        <ProtectedRoute
          exact path="/"
          component={Main}
          loggedIn={true}
        />
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
