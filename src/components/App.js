import { useEffect, useState } from 'react';
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import ImagePopup from './ImagePopup.js';
import ErrorPopup from './ErrorPopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [acceptDeletePopup, setAcceptDeletePopup] = useState({ isOpen: false, card: null });
  const [selectedCard, setSelectedCard] = useState({ name: null, link: null, isOpen: false });
  const [error, setError] = useState({ errorMessage: null, isOpen: false });

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([{ name, about, avatar, _id }, cardData]) => {
        setCurrentUser({ name, about, avatar, _id })
        setCards(cardData)
      }).catch(err => handleErrorMessage(err))
  }, [])

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

  function handleErrorMessage(errorMessage) {
    setError({ errorMessage, isOpen: !error.isOpen })
  }

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
    if (error) { setError(!error) }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onTextError={handleErrorMessage}
        onCardLike={handleCardLike}
        onCardDelete={handleAcceptDelete}
        cards={cards}
      />
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
    </CurrentUserContext.Provider>
  );
}

export default App;