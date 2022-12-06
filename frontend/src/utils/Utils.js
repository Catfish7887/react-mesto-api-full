
//Конфигурация для настройки валидации форм. На данный момент не используется, валидация в стадии разработки
const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_visible'
};

const apiConfig = {
  url: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json'
  }
};

export default apiConfig

