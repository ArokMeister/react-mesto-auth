import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-btn ${isLiked && 'element__like-btn_active'}`);
  
  function handleImageOpen() {
    onCardClick(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      <article className="element">
        {isOwn && <button className="element__remove-btn" type="button" aria-label="Кнопка удаления" onClick={handleCardDelete} />}
        <img className="element__image element__image-temp" alt={card.name} src={card.link} onClick={handleImageOpen} />
        <div className="element__description">
          <h2 className="element__title element__title-temp">{card.name}</h2>
          <div className="element__container">
            <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleCardLike} />
            <span className="element__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  )
}

export default Card