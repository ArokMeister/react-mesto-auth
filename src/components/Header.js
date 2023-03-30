import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ onLogout, email }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <div className='header__container'>
        <p className='header__email'>{email}</p>
        <Routes>
          <Route path='/sign-in' element={<Link to='/sign-up' className="header__link">Регистрация</Link>} />
          <Route path='/sign-up'element={<Link to='/sign-in' className="header__link">Войти</Link>} />
          <Route path='/' element={<Link onClick={onLogout} to='/sign-in' className="header__link" style={{ color: "#A9A9A9" }} >Выход</Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;