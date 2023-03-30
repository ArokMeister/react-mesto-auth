import { useNavigate } from 'react-router-dom';
import succesImage from '../../images/succes.svg';
import failImage from '../../images/fail.svg';

function InfoTooltip({ error, onClose, isOpen }) {
  
  const navigate = useNavigate();

  function handleClose(e) {
    onClose(e)
    !error && navigate('/sign-in', { replace: true })
  }
  
  return (
    <div className={`popup popup_succes ${isOpen ? 'popup_opened' : ''}`} onClick={handleClose} >
      <div className="popup__container popup__container-succes">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={handleClose} />
        <img className="popup__image-succes" src={!error ? succesImage : failImage} alt='' />
        {/* { !error ? <img className="popup__image-succes" src={succesImage} alt='' /> : <img className="popup__image-succes" src={failImage} alt='' /> } */}
        <h2 className="popup__title popup__title-succes">{!error ? 'Вы успешно зарегистрировались!' : 'Что то пошло не так! Попробуйте еще раз!'}</h2>
        <span className="popup__error-succes">{error}</span>
      </div>
    </div>
  )
}

export default InfoTooltip