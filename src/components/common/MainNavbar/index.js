// Dependencies
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'

// Context
import { AuthContext } from '../../auth/authContext'

// Types Reducer
import { types } from '../../../types/types'

export const MainNavbar = () => {
  const { user, dispatch } = useContext(AuthContext)

  const handleLogout = () => {
    const action = { type: types.logout }
    dispatch(action)
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            JOB FINDER
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                'nav-item nav-link ' + (isActive ? 'active' : '')
              }
            >
              Home
            </NavLink>

            {user.logged ? (
              <>
                {/* Dashboard */}
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    'nav-item nav-link ' + (isActive ? 'active' : '')
                  }
                >
                  Dashboard
                </NavLink>

                {/* Add Offers */}
                <NavLink
                  to="/offer/add"
                  className={({ isActive }) =>
                    'nav-item nav-link ' + (isActive ? 'active' : '')
                  }
                >
                  Add Offers
                </NavLink>
              </>
            ) : null}

            {/* Offers */}
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                'nav-item nav-link ' + (isActive ? 'active' : '')
              }
            >
              Offers
            </NavLink>
          </Nav>

          {/* Search Box */}
          <Form className="d-flex justify-content-around">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />

            {!user.logged ? (
              <>
                <NavLink to="/login" className="btn btn-primary me-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-warning me-2">
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <Button
                  to="/logout"
                  className="btn btn-primary me-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <NavLink to="/user/edit" className="btn btn-warning me-2">
                  Profile
                </NavLink>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
