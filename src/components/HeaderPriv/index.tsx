import logo from 'assets/logo.png'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
export default function HeaderPriv() {
  const navigate = useNavigate()
  const routes = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Coins',
      to: '/coin'
    },
    {
      label: 'Wallet',
      to: '/wallet'
    },
    {
      label: 'About',
      to: '/about'
    }
  ]

  function LogOut() {
    localStorage.clear()
    navigate('/demo/home')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">Bytecode</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav">
          {routes.map((route, index) => (
            <li className="nav-item active" key={index}>
              <Link to={route.to} className="nav-link">
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav2">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button className="btn btn-danger" onClick={LogOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
