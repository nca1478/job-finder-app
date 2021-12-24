// Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { HomePage } from '../components/pages/Home'
import { LoginPage } from '../components/pages/Users/Login'
import { RegisterPage } from '../components/pages/Users/Register'
import { OffersPage } from '../components/pages/Offers'

// Routes
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'

// Components
import { MainNavbar } from '../components/common/MainNavbar'
import { OfferPage } from '../components/pages/Offers/Offer'
import { Footer } from '../components/common/Footer'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        {/* PublicRoutes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/offer/details/:offerId" element={<OfferPage />} />

        {/* PrivateRoutes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
