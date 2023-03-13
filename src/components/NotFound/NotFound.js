import { Link, useHistory } from "react-router-dom";

function NotFound () {

  const history = useHistory();

  function goBack () {
    history.goBack();
  }

  return (
    <main className="not-found">
      <div className="not-found__info">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <Link className="not-found__link link" to="" onClick={() => goBack()}>Назад</Link>
    </main>
  )
}

export default NotFound;