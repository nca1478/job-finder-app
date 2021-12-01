import React from 'react'
import { DashboardItem } from '../../components/DashboardItem'

export const DashboardPage = () => {
  return (
    <div className="bg-light">
      <div className="container p-4 bg-light">
        <h2 className="text-center">Dashboard</h2>
        <div id="offers" className="p-2">
          <div className="container">
            <div className="row g-4 justify-content-center">
              <DashboardItem src="https://picsum.photos/id/119/170/100" />
              <DashboardItem src="https://picsum.photos/id/1/170/100" />
              <DashboardItem src="https://picsum.photos/id/20/170/100" />
              <DashboardItem src="https://picsum.photos/id/119/170/100" />
              <DashboardItem src="https://picsum.photos/id/20/170/100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
