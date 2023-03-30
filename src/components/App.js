import { useCallback, useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import Loader from './loader/Loader';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import Login from './authorize/Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './authorize/Register';
import ImagePopup from './popups/ImagePopup.js';
import ErrorPopup from './popups/ErrorPopup.js';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import DeleteCardPopup from './popups/DeleteCardPopup';
import InfoTooltip from './popups/InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [acceptDeletePopup, setAcceptDeletePopup] = useState({ isOpen: false, card: null });
  const [selectedCard, setSelectedCard] = useState({ name: null, link: null, isOpen: false });
  const [error, setError] = useState({ errorMessage: '', isOpen: false });
  const [infoToolTipStatus, setInfoToolTipStatus] = useState({ errorMessage: '', isOpen: false });

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link, isOpen: selectedCard })
  }

  const handleErrorMessage = useCallback(errorMessage => {
    setError({ errorMessage, isOpen: !error.isOpen })
  }, [error.isOpen])

  function handleAcceptDelete(card) {
    setAcceptDeletePopup({ isOpen: true, card })
  }

  function handleCloseAllPopups(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    if (isAddPlacePopupOpen) { setAddPlacePopupOpen(!isAddPlacePopupOpen) }
    if (isEditAvatarPopupOpen) { setEditAvatarPopupOpen(!isEditAvatarPopupOpen) }
    if (isEditProfilePopupOpen) { setEditProfilePopupOpen(!isEditProfilePopupOpen) }
    if (acceptDeletePopup) { setAcceptDeletePopup(!acceptDeletePopup) }
    if (selectedCard) { setSelectedCard(!selectedCard) }
    if (error) { setError({ ...error, isOpen: false }) }
    if (infoToolTipStatus) { setInfoToolTipStatus({...infoToolTipStatus, isOpen: false}) }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
        closeAllPopups()
      })
      .catch(err => handleErrorMessage(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLikes(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((card) => card._id === newCard._id ? newCard : card));
      })
      .catch(err => handleErrorMessage(err))
  }

  function handleUpdateUser(userData) {
    api.setUserData(userData)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => handleErrorMessage(err))
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      }).catch(err => handleErrorMessage(err))
  }

  function handleAddPlaceSubmit(place) {
    api.postCard(place)
      .then(dataPlace => {
        setCards([dataPlace, ...cards])
        closeAllPopups()
      }).catch(err => handleErrorMessage(err))
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setLoggedIn(true)
          setUserEmail(email)
          navigate('/', { replace: true })
        }
      })
      .catch(err => setInfoToolTipStatus({ errorMessage: err.message, isOpen: true }))
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(res => {
        setInfoToolTipStatus({ errorMessage: '', isOpen: true })
      })
      .catch(err => setInfoToolTipStatus({ errorMessage: err.message, isOpen: true }))
  }

  function handleLogout() {
    setLoggedIn(false)
    setUserEmail('')
    localStorage.removeItem('token')
    navigate('/sign-in', { replace: true })
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.checkToken(token)
        .then(({ data }) => {
          setLoggedIn(true)
          setUserEmail(data.email)
          navigate('/', { replace: true })
        })
        .catch(err => handleErrorMessage(err.message))
    } else {
      setLoading(false)
    }
  }, [handleErrorMessage, navigate])

  useEffect(() => {
    handleTokenCheck()
    loggedIn &&
      Promise.all([api.getUserData(), api.getCards()])
        .then(([{ name, about, avatar, _id }, cardData]) => {
          setCurrentUser({ name, about, avatar, _id })
          setCards(cardData)
        })
        .catch(err => handleErrorMessage(err))
        .finally(() => setLoading(false))
  }, [loggedIn, handleTokenCheck, handleErrorMessage]);

  if (loading) {
    return <Loader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onLogout={handleLogout} email={userEmail} />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onTextError={handleErrorMessage}
            onCardLike={handleCardLike}
            onCardDelete={handleAcceptDelete}
            cards={cards}
            loggedIn={loggedIn}
          />
        } />
        <Route path='/sign-in' element={<Login onLogin={handleLogin} loggedIn={loggedIn} />} />
        <Route path='/sign-up' element={<Register onRegister={handleRegister} loggedIn={loggedIn} />} />
        <Route path='/' element={loggedIn ? <NavLink to='/' /> : <NavLink to='/sign-in' />} />
        <Route path='*' element={<NavLink to='/' />} />
      </Routes>
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <DeleteCardPopup
        card={acceptDeletePopup.card}
        isOpen={acceptDeletePopup.isOpen}
        onClose={handleCloseAllPopups}
        acceptDelete={handleCardDelete}
      />

      <ImagePopup
        card={selectedCard}
        onClose={handleCloseAllPopups}
      />

      <ErrorPopup
        error={error}
        onClose={handleCloseAllPopups}
      />

      <InfoTooltip 
        isOpen={infoToolTipStatus.isOpen}
        onClose={handleCloseAllPopups}
        error={infoToolTipStatus.errorMessage}
      />
      
    </CurrentUserContext.Provider>
  );
}

export default App;