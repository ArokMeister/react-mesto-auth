function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_view ${card.isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container-view">
        <button className="popup__close-button popup__close-image" type="button" aria-label="Закрыть" onClick={onClose} />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup