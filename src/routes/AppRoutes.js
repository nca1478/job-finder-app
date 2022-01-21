// Dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { HomePage } from '../components/pages/Home'
import { LoginPage } from '../components/pages/Users/Login'
import { RegisterPage } from '../components/pages/Users/Register'
import { OffersPage } from '../components/pages/Offers'

// Routes
import { PrivateRoute } from './PrivateRoute'

// Components
import { MainNavbar } from '../components/common/MainNavbar'
import { OfferPage } from '../components/pages/Offers/Offer'
import { Footer } from '../components/common/Footer'
import { SearchPage } from '../components/pages/Offers/Search'
import { RecoverPassword } from '../components/pages/Users/RecoverPassword'
import { ChangePassword } from '../components/pages/Users/ChangePassword'
import { NotFound } from '../components/pages/NotFound'
import { DashboardPage } from '../components/pages/Offers/Dashboard'
import { AddOfferPage } from '../components/pages/Offers/Add'
import { EditOfferPage } from '../components/pages/Offers/Edit'
import { EditUserPage } from '../components/pages/Users/Edit'
import { DashboardRoutes } from './DashboardRoutes'

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
        <Route path="/offer/:offerId/details" element={<OfferPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* PrivateRoutes: with NotFound Page */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/add"
          element={
            <PrivateRoute>
              <AddOfferPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:offerId/edit"
          element={
            <PrivateRoute>
              <EditOfferPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/edit"
          element={
            <PrivateRoute>
              <EditUserPage />
            </PrivateRoute>
          }
        />
        <Route exact path="*" element={<NotFound />} />

        {/* PrivateRoutes: without NotFound Page */}
        {/* <Route path="/*" element={<PrivateRoute><DashboardRoutes /></PrivateRoute>} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
