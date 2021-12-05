import { Route, Routes } from 'react-router-dom'
import { AddOfferPage } from '../components/pages/Offers/Add'
import { DashboardPage } from '../components/pages/Offers/Dashboard'
import { EditOfferPage } from '../components/pages/Offers/Edit'
import { OfferPage } from '../components/pages/Offers/Offer'
import { EditUserPage } from '../components/pages/Users/Edit'
import { OffersPage } from '../components/pages/Offers'

export const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/offer/details" element={<OfferPage />} />
        <Route path="/offer/add" element={<AddOfferPage />} />
        <Route path="/offer/edit" element={<EditOfferPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/user/edit" element={<EditUserPage />} />
      </Routes>
    </>
  )
}
