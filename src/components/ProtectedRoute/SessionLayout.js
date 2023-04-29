import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { checkToken } from "../../utils/Auth";

const SessionLayout = ({children, setLoggedIn}) => {
  const { setUser } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((res) => {
        if (res) {
          setUser(res)
          setLoggedIn(true);
        }
      }).catch(err => console.log(err));
    }
  }, [setLoggedIn, setUser])

  return children;
};

export default SessionLayout;