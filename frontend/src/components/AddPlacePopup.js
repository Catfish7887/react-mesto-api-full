import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const nameRef = useRef()
  const linkRef = useRef()

  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';

  }, [props.isOpened])

  function handleSubmit(e) {
    e.preventDefault()

    props.onSubmit(
      {
        name: nameRef.current.value,
        link: linkRef.current.value
      }
    )

  }

  return (
    <>
      <PopupWithForm name="add" buttonText={'Создать'} onClose={props.onClose} onSubmit={handleSubmit} isOpened={props.isOpened} children={(<>
        <h2 className="popup__name">Новое место</h2>
        <input ref={nameRef} id="place-name" name="name" type="text" className="popup__input" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error place-name-error"></span>
        <input ref={linkRef} id="url" name="link" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error url-error"></span>
      </>)} />
    </>

  )
}

export default AddPlacePopup