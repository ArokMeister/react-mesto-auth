import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const { register, formState: { errors }, handleSubmit, clearErrors } = useForm({ mode: "onChange" });

  const [avatar, setAvatar] = useState('');
  
  function handleChangeInput(evt) {
    setAvatar(evt.target.value)
  }

  function submitForm() {
    onUpdateAvatar({
      avatar
    });
  } 

  useEffect(() => {
    setAvatar('')
    clearErrors()
  }, [isOpen, clearErrors])

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      btnText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(submitForm)} >
      <input  
        className="popup__input popup__input-avatar" 
        type="url" 
        id="useravatar" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        autoComplete="off" 
        value={avatar}
        {...register("avatar", {
          required: "Обязательное поле",
          pattern: {
            value: (/^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/),
            message: "Введите URL"
          },
          onChange: handleChangeInput
        })}
      />
      <span className="popup__error" id="avatar-error">{errors?.avatar?.message}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup