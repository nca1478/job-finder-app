// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap'

// Context
import { AuthContext } from '../../../auth/authContext'

// Types Reducer
import { types } from '../../../types/types'

export const MainNavbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: types.logout })
    navigate('/', { replace: true })
  }

  const handleOnBlur = () => {
    setValue('searchText', null)
  }

  const onSubmit = (data) => {
    navigate(`/search?q=${data.searchText}`)
  }

  const styleActive = ({ isActive }) => {
    return 'nav-item nav-link ' + (isActive ? 'active' : '')
  }

  return (
    <>
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
              <NavLink to="/" className={styleActive}>
                Home
              </NavLink>

              {user.logged ? (
                <>
                  <NavLink to="/dashboard" className={styleActive}>
                    Dashboard
                  </NavLink>

                  <NavLink to="/offer/add" className={styleActive}>
                    Add Offers
                  </NavLink>
                </>
              ) : null}

              <NavLink to="/offers" className={styleActive}>
                Offers
              </NavLink>
            </Nav>

            <Form
              className="d-flex justify-content-around"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Form.Control
                type="search"
                placeholder="Search Offers by Title"
                className="me-2"
                aria-label="Search"
                {...register('searchText', {
                  onBlur: handleOnBlur,
                })}
              />

              {!user.logged ? (
                <>
                  <NavLink to="/register" className="btn btn-warning me-2">
                    Signup
                  </NavLink>
                  <NavLink to="/login" className="btn btn-primary me-2">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/user/edit" className="btn btn-warning me-2">
                    Profile
                  </NavLink>
                  <Button
                    to="/logout"
                    className="btn btn-primary me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
