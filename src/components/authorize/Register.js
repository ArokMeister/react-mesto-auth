import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";

function Register({ onRegister, loggedIn }) {

  const [values, setValues] = useState({ email: '', password: '' })

  function submit() {
    onRegister(values.email, values.password)
    setValues({ email: '', password: '' })
  }

  function onChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  if (loggedIn) {
    return <NavLink to='/' />
  }

  return (
    <>
      <h1 className="form__title">Регистрация</h1>
      <AuthorizeForm onChange={onChange} onSubmit={submit} values={values} btnText='Зарегистрироваться' />
      <p className="form__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link> </p>
    </>

  )
}

export default Register