import { useState } from "react";
import Menu from "../Menu/Menu";

function Burger (props) {
  const [btnClass, setBtnClass] = useState("burger__btn ")
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBtnClass("burger__btn_active ")
      setIsOpen(true)
    }
    else {
      setBtnClass("burger__btn" )
      setIsOpen(false)
    }
    setIsMenuClicked(!isMenuClicked);
  }


  return (
    <>
      <Menu isOpen={isOpen}/>
      <div className={"burger button"} onClick={updateMenu}>
        <span className={isMenuClicked ? btnClass + props.class : "burger__btn " + props.class} />
      </div>
    </>
  )
}

export default Burger;