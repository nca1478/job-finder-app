// Dependencies
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import { MainNavbar } from '../components/common/MainNavbar'
import { Footer } from '../components/common/Footer'

// Pages
import { HomePage } from '../components/pages/Home/Home'
import { LoginPage } from '../components/pages/Users/Login'
import { RegisterPage } from '../components/pages/Users/Register'
import { OffersPage } from '../components/pages/Offers'
import { OfferPage } from '../components/pages/Offers/Offer'
import { SearchPage } from '../components/pages/Offers/Search'
import { RecoverPassword } from '../components/pages/Users/RecoverPassword'
import { ChangePassword } from '../components/pages/Users/ChangePassword'
import { NotFound } from '../components/pages/NotFound/NotFound'
import { DashboardPage } from '../components/pages/Offers/Dashboard'
import { AddOfferPage } from '../components/pages/Offers/Add'
import { EditOfferPage } from '../components/pages/Offers/Edit'
import { EditUserPage } from '../components/pages/Users/Edit'
import { SkillsPage } from '../components/pages/Skills/Skills'
import { SectorsPage } from '../components/pages/Sectors/Sectors'
import { HowItWorksPage1 } from '../components/pages/HowItWorks/HowItWorks1'
import { HowItWorksPage2 } from '../components/pages/HowItWorks/HowItWorks2'

// Routes
import { PrivateRoute } from './PrivateRoute'

export const AppRoutes = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [setLoading])

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
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
          <Route path="/howitworks1" element={<HowItWorksPage1 />} />
          <Route path="/howitworks2" element={<HowItWorksPage2 />} />
          <Route path="/404" element={<NotFound />} />

          {/* PrivateRoutes */}
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

          {/* AdminRoutes */}
          <Route
            path="/skills"
            element={
              <PrivateRoute>
                <SkillsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/sectors"
            element={
              <PrivateRoute>
                <SectorsPage />
              </PrivateRoute>
            }
          />

          <Route exact path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
