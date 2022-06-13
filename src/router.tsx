import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Login } from './pages/Login'
import { FC } from 'react'
import { useAuth } from './hooks/useAuth'
import SignUp from './pages/SignUp'
import HeaderPriv from 'components/HeaderPriv'
import HeaderPublic from 'components/HeaderPublic'
import Footer from 'components/Footer'
import Coin from './pages/Coin/index.'
import NotFound from './pages/NotFound'
import Wallet from './pages/Wallet'
import Transactions from './pages/Transactions'

const PrivateOutlet: FC = ({ children }: any) => {
  const { isLoading, token } = useAuth()

  if (isLoading) {
    return <p>Loading....</p>
  }

  return token ? (
    <>
      <HeaderPriv />
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to={'/demo/home'} replace />
  )
}

const PublicOutlet: FC = ({ children }: any) => {
  const { isLoading, token } = useAuth()

  if (isLoading) {
    return <p>Loading....</p>
  }

  return !token ? (
    <>
      <HeaderPublic />
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to={'/'} replace />
  )
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path={'auth'} element={<PublicOutlet />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path={'demo'} element={<PublicOutlet />}>
          <Route path="home" element={<Home />} />
        </Route>

        <Route path={'/'} element={<PrivateOutlet />}>
          <Route index element={<Home />} />
          <Route path={'/coin'} element={<Coin />} />
          <Route path={'/wallet'} element={<Wallet />} />
          <Route path={'/transactions'} element={<Transactions />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
