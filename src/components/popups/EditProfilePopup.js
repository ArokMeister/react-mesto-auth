import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const { register, setValue, formState: { errors }, handleSubmit, clearErrors } = useForm({ mode: "onChange" });

  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({ name: '', about: '' })

  useEffect(() => {
    setUserData({ name: currentUser.name, about: currentUser.about })
    setValue("name", userData.name)
    setValue("about", userData.about)
    clearErrors()
  }, [currentUser, isOpen, clearErrors, setValue, userData.about, userData.name])

  function formSubmit(user) {
    onUpdateUser({
      name: user.name,
      about: user.about
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      btnText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(formSubmit)} >
      <input
        className="popup__input popup__input-name"
        id="name"
        name="name"
        placeholder="Имя"
        autoComplete="off"
        {...register("name", {
          required: "Обязательное поле",
          minLength: {
            value: 2,
            message: "Минимальная длина поля: 2 символа"
          },
          maxLength: {
            value: 20,
            message: "Максимальная длина поля: 20 символов"
          }
        })}
      />
      <span className="popup__error" id="name-error">{errors?.name?.message}</span>
      <input
        className="popup__input popup__input-job"
        id="job"
        name="about"
        placeholder="О себе"
        autoComplete="off"
        {...register("about", {
          required: "Обязательное поле",
          minLength: {
            value: 2,
            message: "Минимальная длина поля: 2 символа",
          },
          maxLength: {
            value: 200,
            message: "Максимальная длина поля: 200 символов"
          }
        })}
      />
      <span className="popup__error" id="job-error">{errors?.about?.message}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup