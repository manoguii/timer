import { HeaderContainer } from './styles'
import { Scroll, Timer } from 'phosphor-react'
import logo from '../../assets/Logo.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="logotipo" />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="historico">
          {' '}
          <Scroll size={24} />{' '}
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
