import { useLocation, Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ onLogout, email }) {

  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <div className='header__container'>
        <p className='header__email'>{email}</p>
        {location.pathname === '/' && (
          <Link onClick={onLogout} to='/sign-in' className="header__link" style={{ color: "#A9A9A9" }} >Выход</Link>
        )}
        {location.pathname === '/sign-in' && (
          <Link to='/sign-up' className="header__link">Регистрация</Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to='/sign-in' className="header__link">Войти</Link>
        )}
      </div>
    </header>
  );
}

export default Header;