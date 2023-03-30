import { useLocation } from "react-router-dom";

function Footer() {

  const currentYear = new Date();
  const location = useLocation();

  return (
    <footer className="footer">
      {location.pathname === '/' && (
        <p className="footer__copyright">{`© ${currentYear.getFullYear()} Mesto Russia`}</p>
      )}
    </footer>
  )
}

export default Footer