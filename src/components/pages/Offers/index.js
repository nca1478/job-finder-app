import { OfferItem } from '../../common/OfferItem'

export const OffersPage = () => {
  return (
    <div className="bg-light">
      <div className="container p-4 bg-light">
        <h2 className="text-center">Job Offers</h2>
        <div id="offers" className="p-2">
          <div className="container">
            <div className="row g-4 justify-content-center">
              <OfferItem src="https://picsum.photos/id/119/170/100" />
              <OfferItem src="https://picsum.photos/id/1/170/100" />
              <OfferItem src="https://picsum.photos/id/20/170/100" />
              <OfferItem src="https://picsum.photos/id/119/170/100" />
              <OfferItem src="https://picsum.photos/id/20/170/100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
