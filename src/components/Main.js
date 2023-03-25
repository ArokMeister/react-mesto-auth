import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-edit" onClick={onEditAvatar} />
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить фото" onClick={onAddPlace} />
      </section>
      <section className="elements" aria-label="Секция карточек">
        <ul className="elements__list">
          {cards.map(card => (
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete} 
            />))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main