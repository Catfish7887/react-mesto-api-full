import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

  const userContext = useContext(CurrentUserContext)

  const isOwn = props.owner === userContext._id;
  const isLiked = props.likes.some(i => i === userContext._id);

  const cardLikeButtonClassName = `${isLiked ? 'place__like-btn place__like-btn_active' : 'place__like-btn'}`;

  function handleCardDelete() {
    props.handleDelete(props);

  };

  function handleCardClick() {
    props.handleCardClick(props);

  };

  function handleLikeClick() {
    props.handleLike(props);
  };

  return (
    <li className="place">
      <img src={props.link} alt={props.name} onClick={handleCardClick} className="place__image" />
      <div className="place__container">
        <h2 className="place__name">{props.name}</h2>
        <div className="place__like-container">
          <button type="button" onClick={handleLikeClick} aria-label="Лайк" className={cardLikeButtonClassName}></button>
          <p className="place__like-count">{props.likes.length}</p>
        </div>
      </div>
      {isOwn ? <button type="button" aria-label="Удалить" onClick={handleCardDelete} className="place__delete-btn"></button> : null}
    </li>
  )

}

export default Card