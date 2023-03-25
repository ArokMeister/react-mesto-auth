import { useEffect, createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, errors }) {

  const avatarRef = createRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      btnText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} >
      <input 
        ref={avatarRef} 
        className="popup__input popup__input-avatar" 
        type="url" 
        id="avatar" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        autoComplete="off" 
        required
      />
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup