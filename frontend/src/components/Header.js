import headerLogo from '../images/logo.svg'
import NavBar from './NavBar';

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Лого" className="header__logo" />
      <div className='header__container'>
        {props.isLoggedIn ? (
          <>
            <span className='header__login-span'>{props.email}</span>
            <button onClick={props.onLogout} className='header__button' type='button'>Выйти</button>
          </>
        ) : <NavBar />}
      </div>

    </header>
  );
}

export default Header


