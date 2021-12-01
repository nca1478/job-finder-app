import React from 'react'
import { OfferItem } from '../components/OfferItem'
import { Showcase } from '../components/Showcase'

export const HomePage = () => {
  return (
    <>
      <Showcase />
      <div id="offers" className="p-5 bg-primary">
        <div className="container">
          <h2 className="text-center text-white mb-5">Last Job Offers</h2>

          <div className="row g-4 justify-content-center">
            <OfferItem src="https://picsum.photos/id/119/170/100" />
            <OfferItem src="https://picsum.photos/id/1/170/100" />
            <OfferItem src="https://picsum.photos/id/20/170/100" />
          </div>
        </div>
      </div>
    </>
  )
}
