

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpened ? "popup_opened" : 'popup_closed'}`}
      onMouseDown={(e) => { e.target.classList.contains('popup_opened') && props.onClose() }}
    >
      <div className="popup__container">
        <form name={`${props.name}`} className="popup__form" onSubmit={props.onSubmit} >
          <>{props.children}</>
          <button type="submit" className="popup__submit-btn">{props.buttonText}</button>
        </form>
        <button type="button" aria-label="Закрыть" onClick={props.onClose} className="popup__close-btn"></button>
      </div>
    </div>
  )

}

export default PopupWithForm