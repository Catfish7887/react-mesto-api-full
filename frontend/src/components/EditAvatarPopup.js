import { useRef, useEffect } from "react"
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.value = '';

  }, [props.isOpened])

  function handleSubmit(e) {

    e.preventDefault();

    props.onSubmit({
      avatar: inputRef.current.value
    });

  }

  return (
    <PopupWithForm name={'edit'} isOpened={props.isOpened} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit} children={
      <>
        <h2 className="popup__name popup__name_avatar">Обновить аватар</h2>
        <input id="avatar" name="avatar" type="url" className="popup__input" placeholder="Ссылка на картинку" ref={inputRef} required />
        <span className="popup__input-error avatar-error"></span>
      </>
    } />
  )

}

export default EditAvatarPopup
