import { useState } from "react";
import Menu from "../Menu/Menu";

function Burger (props) {
  const [btnClass, setBtnClass] = useState("burger__btn ")
  const [isOpen, setIsOpen] = useState(false)
  /* const [isMenuClicked, setIsMenuClicked] = useState(false) */

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
      <div className={"burger button"} onClick={updateMenu}>
        <span className={(isOpen ? btnClass : "burger__btn ") + (props.isMain ? "burger__btn_color_white" : "")} />
      </div>
    </>
  )
}

export default Burger;