// Dependencies
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Custom Dependencies
import { AuthContext } from "../../../auth/authContext";
import { types } from "../../../types/types";

export const MainNavbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: types.logout });
    sessionStorage.removeItem("joboffer-path");
    navigate("/", { replace: true });
  };

  const handleOnBlur = () => {
    setValue("searchText", null);
  };

  const onSubmit = (data) => {
    navigate(`/search?q=${data.searchText}`);
  };

  const styleActive = ({ isActive }) => {
    return "nav-item nav-link " + (isActive ? "active" : "");
  };

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
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/" className={styleActive}>
                Inicio
              </NavLink>

              <NavDropdown title="Como Funciona" id="basic-nav-dropdown">
                <LinkContainer to="/howitworks1">
                  <NavDropdown.Item>Encuentra un Trabajo</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/howitworks2">
                  <NavDropdown.Item>Publica un Trabajo</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              {user.logged ? (
                user.data.role === "USER_ROLE" ? (
                  <>
                    <NavLink to="/dashboard" className={styleActive}>
                      Dashboard
                    </NavLink>

                    <NavLink to="/offer/add" className={styleActive}>
                      Agregar Trabajo
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/sectors" className={styleActive}>
                      Sectores
                    </NavLink>
                    <NavLink to="/skills" className={styleActive}>
                      Habilidades
                    </NavLink>
                  </>
                )
              ) : null}

              <NavLink to="/offers" className={styleActive}>
                Trabajos
              </NavLink>
            </Nav>

            <Form
              className="d-flex justify-content-around"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Form.Control
                type="search"
                placeholder="Buscar trabajos"
                className="me-2"
                aria-label="Search"
                {...register("searchText", {
                  onBlur: handleOnBlur,
                })}
              />

              {!user.logged ? (
                <>
                  <NavLink to="/register" className="btn btn-warning me-2">
                    Registro
                  </NavLink>
                  <NavLink to="/login" className="btn btn-primary me-2">
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/user/edit" className="btn btn-warning me-2">
                    Perfil
                  </NavLink>
                  <Button
                    to="/logout"
                    className="btn btn-primary me-2"
                    onClick={handleLogout}
                  >
                    Salir
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
