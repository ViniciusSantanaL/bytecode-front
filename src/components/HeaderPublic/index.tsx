import logo from 'assets/logo.png'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function HeaderPublic() {
  const [actualHome, setActualHome] = useState()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand">Bytecode</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to={'/demo/home'} className="nav-link">
                Home
              </Link>
            </a>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav2">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to={'/auth/login'} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item active">
            <Link to={'/auth/sign-up'} className="nav-link">
              Sign-Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
