function Footer() {
  const currentYear = new Date();
  return (
    <footer className="footer">
      <p className="footer__copyright">{`© ${currentYear.getFullYear()} Mesto Russia`}</p>
    </footer>
  )
}

export default Footer