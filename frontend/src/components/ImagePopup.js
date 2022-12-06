function ImagePopup(props) {

  return (
    <div className={`popup popup_type_image ${props.selectedCard.name ? "popup_opened" : 'popup_closed'}`}
      onMouseDown={(e) => { e.target.classList.contains('popup_opened') && props.onClose() }}
    >
      <figure className="popup__figure-container">
        <img src={props.selectedCard.link} alt={props.selectedCard.name} className="popup__image" />
        <figcaption className="popup__image-caption">{props.selectedCard.name}</figcaption>
        <>
          {props.selectedCard.name ? (<button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-btn"></button>) : null}
        </>
      </figure>
    </div>
  );

}

export default ImagePopup