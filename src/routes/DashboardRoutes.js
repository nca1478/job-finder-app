// Dependencies
import { Route, Routes } from 'react-router-dom'
import { AddOfferPage } from '../components/pages/Offers/Add'
import { DashboardPage } from '../components/pages/Offers/Dashboard'
import { EditOfferPage } from '../components/pages/Offers/Edit'
import { EditUserPage } from '../components/pages/Users/Edit'

export const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/offer/add" element={<AddOfferPage />} />
        <Route path="/offer/:offerId/edit" element={<EditOfferPage />} />
        <Route path="/user/edit" element={<EditUserPage />} />
      </Routes>
    </>
  )
}
