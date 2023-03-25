import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, onClose, isOpen, acceptDelete }) {

  function handleSubmit(evt) {
    evt.preventDefault()
    acceptDelete(card)
  }

  return (
    <PopupWithForm
      title={'Вы уверены?'}
      styleTitle={30}
      name={'remove'}
      btnText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeleteCardPopup