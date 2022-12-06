import { useEffect, useState, } from "react";
import { Route, useNavigate, Routes } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import authApi from "../utils/AuthApi.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";

import PopupWithError from "./PopupWithError.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpenm, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isTooltipPopupOpened, setIsTooltipPopupOpened] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => { checkToken() }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const getUser = api.getProfile();
      const getCards = api.getInitialCards();

      Promise.all([getUser, getCards])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards)

        })
        .catch(err => console.log(err))
    }

  }, [isLoggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;



    authApi.getUser(jwt)
      .then(res => {
        setUserEmail(res.email)
        setIsLoggedIn(true)
      })
      .then(() => api.getToken())
      .then(() => navigate('/'))
      .catch(() => {
        handleShowError()
      })
  
  };

  function handleSignUp({ email, password }) {
    authApi.register({ email: email, password: password })
      .then(() => {
        navigate('/login')
        setIsAuthSuccess(true)
      })
      .then(() => {
        setIsTooltipPopupOpened(true)
      })
      .catch((err) => {
        handleShowAuthError()
      })
  };

  function handleSignIn({ email, password }) {
    authApi.login({ email: email, password: password })
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setUserEmail(email)
        setIsLoggedIn(true)
      })
      .then(() => api.getToken())
      .then(() => navigate('/'))
      .catch(() => handleShowAuthError())
  };

  // Функции для взаимодействия с API сервера с карточками/профилем

  function handleCardDelete(card) {
    api.deleteCardById(card._id).then(() => {
      setCards((state) => state.filter((c) => {
        return c._id !== card._id
      }));
    })
      .catch((res) => console.log(res))

  };

  function addPlace(data) {
    api.createCard(data)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))

  };

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((res) => console.log(res))
  };

  function editProfile({ name, about }) {
    api.editProfile({ name, about })
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((res) => console.log(res))

  };

  function changeAvatar({ avatar }) {
    api.changeAvatar({ avatar })
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch(err => console.log(err))

  };

  function handleLogout() {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/login')
  };

  // Ниже функции открытия/закрытия модальных окон

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)

  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)

  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)

  };

  function handleCardClick(card) {
    setSelectedCard(card)

  };

  function handleShowError() {
    setIsErrorPopupOpen(true)
  };

  function handleShowAuthError() {
    setIsAuthSuccess(false)
    setIsTooltipPopupOpened(true)
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsErrorPopupOpen(false)
    setSelectedCard({})
    setIsTooltipPopupOpened(false)

  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={userEmail} onLogout={handleLogout} isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/register" element={<Register onSubmit={handleSignUp} />} />
        <Route path="/login" element={<Login onSubmit={handleSignIn} />} />
        <Route path="/" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} component={
            <Main
              handleAddPlaceClick={handleAddPlaceClick}
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          } />
        }>
        </Route>
      </Routes>

      <Footer />

      <EditProfilePopup onClose={closeAllPopups} onSubmit={editProfile} isOpened={isEditProfilePopupOpen} />

      <EditAvatarPopup onClose={closeAllPopups} onSubmit={changeAvatar} isOpened={isEditAvatarPopupOpen} />

      <AddPlacePopup onClose={closeAllPopups} onSubmit={addPlace} isOpened={isAddPlacePopupOpenm} />

      <PopupWithForm buttonText={"ДА"} name="delete" onClose={closeAllPopups} />

      <ImagePopup onClose={closeAllPopups} selectedCard={selectedCard} />

      {/* Этот компонент будет для обработки ошибок, не касающихся авторизации. В планах написать систему обработки ошибок внутри форм модальных окон */}
      <PopupWithError onClick={closeAllPopups} onClose={closeAllPopups} isOpened={isErrorPopupOpen} />

      {/* Этот компонент отвечает за обработку ошибок авторизации */}
      <InfoTooltip state={isAuthSuccess} isOpened={isTooltipPopupOpened} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>
  );
};

export default App;
