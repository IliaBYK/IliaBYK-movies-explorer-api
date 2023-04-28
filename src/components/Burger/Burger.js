import { useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";

function Burger (props) {
  const [btnClass, setBtnClass] = useState("burger__btn ")
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation();

  const loginLoc = () => location.pathname === "/signin";
  const regLoc = () => location.pathname === "/signup";

  const authLoc = loginLoc() || regLoc();

  const updateMenu = () => {
    if (!isOpen) {
      setBtnClass("burger__btn_active ")
      setIsOpen(true)
    }
    else {
      setBtnClass("burger__btn" )
      setIsOpen(false)
    }
  }

  const handleClickLink = () => {
    setIsOpen(false);
  }


  return (
    <>
      <Menu isOpen={isOpen} clickLink={handleClickLink}/>
      <div className={authLoc ? "burger_loc_auth" : "burger button"} onClick={updateMenu}>
        <span className={(isOpen ? btnClass : "burger__btn ") + (props.isMain ? "burger__btn_color_white" : "")} />
      </div>
    </>
  )
}

export default Burger;