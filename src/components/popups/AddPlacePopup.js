import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const { register, formState: { errors }, handleSubmit, clearErrors } = useForm({ mode: "onChange" })

  const [cardData, setCardData] = useState({ name: "", link: "" })

  function handleChangeInput(evt) {
    setCardData({ ...cardData, [evt.target.name]: evt.target.value })
  }

  function formSubmit() {
    onAddPlace({
      name: cardData.name,
      link: cardData.link,
    });
  }

  useEffect(() => {
    setCardData({ name: "", link: "" })
    clearErrors()
  }, [isOpen, clearErrors])

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'place'}
      btnText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(formSubmit)} >
      <input
        className="popup__input popup__input-place"
        id="placename"
        name="name"
        placeholder="Название места"
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
          },
          onChange: handleChangeInput
        })}
        value={cardData.name}
      />
      <span className="popup__error popup__error_visible" id="place-error">{errors?.name?.message}</span>
      <input
        className="popup__input popup__input-url"
        type="url"
        id="url"
        name="link"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        {...register("link", {
          required: "Обязательное поле",
          pattern: {
            value: (/^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/),
            message: "Введите URL"
          },
          onChange: handleChangeInput
        })}
        value={cardData.link}
      />
      <span className="popup__error popup__error_visible" id="url-error">{errors?.link?.message}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup