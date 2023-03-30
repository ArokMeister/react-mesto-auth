import { useForm } from 'react-hook-form';

function AuthorizeForm({ onSubmit, onChange, btnText, values }) {

  const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" })

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          className="form__input"
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          placeholder='E-mail'
          value={values.email}
          {...register("email", {
            required: "Обязательное поле",
            pattern: {
              value: (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu),
              message: "Введите E-mail"
            },
            onChange: onChange
          })}
        />
        <span className="popup__error">{errors?.email?.message}</span>
        <input
          className="form__input"
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          placeholder='Пароль'
          value={values.password}
          {...register("password", {
            required: "Обязательное поле",
            minLength: {
              value: 6,
              message: "Минимум 6 символов"
            },
            onChange: onChange
          })}
        />
        <span className="popup__error">{errors?.password?.message}</span>
        <button className="form__btn" >{btnText}</button>
      </form>
    </div>
  )
}

export default AuthorizeForm