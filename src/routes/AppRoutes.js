import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainNavbar } from '../components/common/MainNavbar'
import { HomePage } from '../components/pages/Home'
import { LoginPage } from '../components/pages/Users/Login'
import { RegisterPage } from '../components/pages/Users/Register'
import { DashboardRoutes } from './DashboardRoutes'
import { Footer } from '../components/common/Footer'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
