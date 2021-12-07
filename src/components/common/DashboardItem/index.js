import { Link } from 'react-router-dom'

export const DashboardItem = ({ src }) => {
  const handleDelete = () => {
    window.confirm('Are you sure?')
  }

  return (
    <div className="col-lg-9 col-sm-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center text-center justify-content-between">
            <img className="img-thumbnail d-none d-md-block" src={src} alt="" />
            <p className="card-text h5">Title Job Offer</p>
            <div>
              <Link to="/offer/edit" className="btn btn-primary mx-2">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
