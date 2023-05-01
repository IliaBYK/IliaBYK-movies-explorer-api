import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to='/signin'/>
  }

  return children;
}

export default RequireAuth;