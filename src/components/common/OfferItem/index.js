import { Link } from 'react-router-dom'

export const OfferItem = ({ src }) => {
  return (
    <div className="col-lg-9 col-sm-12">
      <div className="card">
        <div className="card-header h5 text-center">Title Job Offer</div>
        <div className="card-body">
          <div className="d-flex align-items-center text-center justify-content-around">
            <img className="img-thumbnail d-none d-md-block" src={src} alt="" />
            <p className="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              dolorem reiciendis facilis, atque velit qui?
            </p>
            <Link to="/offer/details" className="btn btn-dark">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
