// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { post } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { types } from '../../../types/types'
import { InputGroupForm } from './components/InputGroupForm'
import { GoogleButton } from './components/GoogleButton'
import { FacebookButton } from './components/FacebookButton'
import { redirectPageOffers } from '../../../helpers/utils'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    post('/users/login', data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          const dataUser = {
            ...response.data.user,
            token: response.data.token,
          }
          dispatch({
            type: types.login,
            payload: { data: dataUser },
          })
          redirectPageOffers(dataUser, navigate)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar iniciar sesión.')
        console.log(error)
      })
  }

  const responseGoogle = (response) => {
    const tokenId = { tokenId: response.tokenId }
    post('/users/google', tokenId)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          const dataUser = {
            token: response.data.token,
            ...response.data.user,
          }
          dispatch({
            type: types.login,
            payload: { data: dataUser },
          })
          redirectPageOffers(dataUser, navigate)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar iniciar sesión en Google.')
        console.log(error)
      })
  }

  const responseFacebook = (response) => {
    const facebookData = {
      accessToken: response.accessToken,
      userID: response.userID,
    }
    post('/users/facebook', facebookData)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          const dataUser = {
            token: response.data.token,
            ...response.data.user,
          }
          dispatch({
            type: types.login,
            payload: { data: dataUser },
          })
          redirectPageOffers(dataUser, navigate)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar iniciar sesión en facebook.')
        console.log(error)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="text-center">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-dark py-3">
              <Card.Body className="text-center animate__animated animate__fadeIn">
                <h1 className="mb-3">
                  <i className="bi bi-person-circle"></i>
                </h1>
                <h3 className="card-title mb-3">Login</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Username */}
                  <InputGroupForm
                    type="text"
                    register={register}
                    errors={errors.email}
                    icon="bi bi-person-circle"
                    label="Email"
                    name="email"
                    validationRules={{ required: 'Email es requerido' }}
                  />

                  {/* Password */}
                  <InputGroupForm
                    type="password"
                    register={register}
                    errors={errors.password}
                    icon="bi bi-key"
                    label="Contraseña"
                    name="password"
                    validationRules={{ required: 'Contraseña es requerida' }}
                  />

                  {/* Login Buttons */}
                  <Button type="submit" variant="dark" className="w-100">
                    Login
                  </Button>

                  <h5 className="card-title my-3">O</h5>

                  {/* Social Media Authentication Buttons */}
                  <GoogleButton responseGoogle={responseGoogle} />
                  <FacebookButton responseFacebook={responseFacebook} />

                  <span className="card-title">
                    ¿Necesitas una cuenta?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Registrar
                    </Link>
                  </span>
                  <br />
                  <span className="card-title">
                    ¿Olvidaste tu contraseña?{' '}
                    <Link
                      to="/recover-password"
                      style={{ textDecoration: 'none' }}
                    >
                      Recuperar
                    </Link>
                  </span>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
