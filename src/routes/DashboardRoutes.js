import { Route, Routes } from 'react-router-dom'
import { AddOfferPage } from '../pages/offers/add'
import { OffersPage } from '../pages/offers'
import { DashboardPage } from '../pages/offers/dashboard'
import { EditOfferPage } from '../pages/offers/edit'
import { OfferPage } from '../pages/offers/offer'
import { EditUserPage } from '../pages/user/edit'

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
