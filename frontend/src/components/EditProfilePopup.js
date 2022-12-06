import { useState, useContext, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const [values, setValues] = useState({});

  const userContext = useContext(CurrentUserContext)

  useEffect(() => {
    setValues({
      name: userContext.name,
      about: userContext.about
    })
  }, [userContext, props.isOpened])


  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  function handleSubmit(e) {

    e.preventDefault();

    props.onSubmit({
      name: values.name,
      about: values.about,
    });

  }

  return (
    <PopupWithForm name={'editProfile'} isOpened={props.isOpened} onClose={props.onClose} buttonText={'Сохранить'} onSubmit={handleSubmit} children={
      <>
        <h2 className="popup__name">Редактировать профиль</h2>
        <input id="name" onChange={handleChange} value={values.name || ''} name="name" minLength="2" maxLength="40" type="text" placeholder="Имя" className="popup__input" required />
        <span className="popup__input-error name-error"></span>
        <input id="about" onChange={handleChange} value={values.about || ''} name="about" type="text" placeholder="Обо мне" minLength="2" maxLength="200" className="popup__input" required />
        <span className="popup__input-error about-error"></span>
      </>
    } />
  )

}

export default EditProfilePopup