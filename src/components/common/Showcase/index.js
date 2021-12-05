import { Link } from 'react-router-dom'
import showcase from '../../../assets/img/showcase.svg'

export const Showcase = () => {
  return (
    <div
      id="showcase"
      className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
    >
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div>
            <h1>
              Shows you <span className="text-warning">all Jobs</span>
            </h1>
            <p className="lead my-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
              adipisci doloribus qui tempore. Accusamus eius cumque iste facere
              error magni quod atque minima dolores sapiente! Placeat rem
              consequuntur excepturi culpa.
            </p>

            <Link to="/offers" className="btn btn-primary btn-lg">
              View Job Offers
            </Link>
          </div>
          <img
            className="img-fluid w-50 d-none d-sm-block"
            src={showcase}
            alt="showcase"
          />
        </div>
      </div>
    </div>
  )
}
