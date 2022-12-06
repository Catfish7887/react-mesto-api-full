import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

  const userContext = useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">

        <button type="button" aria-label="Изменить аватар" onClick={props.handleEditAvatarClick} className="profile__avatar-btn">
          <img src={userContext.avatar || ''} alt="Аватар пользователя" className="profile__avatar" />
        </button>
        <div className="profile__name-container">
          <div className="profile__flex-container">
            <h1 className="profile__name">{userContext.name}</h1>
            <button type="button" aria-label="Редактировать" onClick={props.handleEditProfileClick} className="profile__edit-btn"></button>
          </div>
          <p className="profile__about">{userContext.about}</p>
        </div>
        <button aria-label="Добавить" type="button" onClick={props.handleAddPlaceClick} className="profile__add-btn"></button>

      </section>
      <section className="places">

        <ul className="places__list">
          {props.cards.map(card => (<Card key={card._id} {...card} handleDelete={props.onCardDelete} handleLike={props.onCardLike} handleCardClick={props.handleCardClick} />))}
        </ul>

      </section>
    </main>

  );

};
export default Main