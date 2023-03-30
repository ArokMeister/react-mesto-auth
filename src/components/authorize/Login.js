import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthorizeForm from "./AuthorizeForm";

function Login({ onLogin, loggedIn }) {

  const [values, setValues] = useState({ email: '', password: '' })

  function submit() {
    onLogin(values.email, values.password)
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
      <h1 className="form__title">Вход</h1>
      <AuthorizeForm onChange={onChange} onSubmit={submit} values={values} btnText='Войти' />
    </>

  )
}

export default Login