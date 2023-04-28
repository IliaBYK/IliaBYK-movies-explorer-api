import { useEffect, useState } from "react";

function Modal({isOpen, error}) {
  const [isOpened, setIsOpened] = useState(isOpen);
  const [err, setErr] = useState(error);

  const modalOpen = () => {
    setIsOpened(true);
    setInterval(() => {
      setIsOpened(false);
    }, 1000);
  }

  useEffect(() => {
    error && modalOpen();
    if (error === "Ошибка: 401") {
      setErr("Необходима регистрация")
    } else if (error.code === 500) {
      setErr("Проблемы с сервером")
    } else {
      setErr(JSON.stringify(error) || error)
    }
  }, [error])

  return (
    <div className={"modal " + (isOpened ? "modal_opened" : "")}>
      <p className="modal__error">{err}</p>
    </div>
  )
}

export default Modal;