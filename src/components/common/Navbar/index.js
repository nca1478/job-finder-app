import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand bg-dark navbar-dark py-3">
        <div className="container">
          <ul className="navbar-nav d-flex align-items-center">
            <div className="nav-item mx-1">
              <Link to="/" className="navbar-brand">
                JOB FINDER
              </Link>
            </div>
            <li className="nav-item mx-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  'nav-item nav-link ' + (isActive ? 'active' : '')
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  'nav-item nav-link ' + (isActive ? 'active' : '')
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/offer/add"
                className={({ isActive }) =>
                  'nav-item nav-link ' + (isActive ? 'active' : '')
                }
              >
                Add Offers
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  'nav-item nav-link ' + (isActive ? 'active' : '')
                }
              >
                Offers
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <div className="nav-item">
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input
                  type="search"
                  className="form-control form-control-dark"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>
            </div>
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-outline-light me-2">
                Login
              </NavLink>
            </li>
            {/* <div className="nav-item">
              <NavLink to="/register" className="btn btn-primary">
                Sign-up
              </NavLink>
            </div> */}
            <li className="nav-item">
              <NavLink to="/user/edit" className="btn btn-primary">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
