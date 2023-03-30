import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";
import style from './TitleAuth.module.css';

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
      <h1 className={style.title}>Регистрация</h1>
      <AuthorizeForm onChange={onChange} onSubmit={submit} values={values} btnText='Зарегистрироваться' />
      <p className={style.subtitle}>Уже зарегистрированы? <Link to="/sign-in" className={style.subtitle_link}>Войти</Link> </p>
    </>

  )
}

export default Register