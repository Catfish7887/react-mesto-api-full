import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className='navlinks-container'>
      <NavLink to='/register' className={({ isActive }) => isActive ? 'header__link_active' : 'header__link'} >Регистрация</NavLink>
      <NavLink to='/login' className={({ isActive }) => isActive ? 'header__link_active' : 'header__link'}>Войти</NavLink>
    </nav>
  )
}

export default NavBar