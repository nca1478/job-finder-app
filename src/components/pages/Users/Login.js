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
import { InputForm } from './common/InputForm'
import { GoogleButton } from './common/GoogleButton'
import { FacebookButton } from './common/FacebookButton'

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
          navigate('/dashboard', { replace: true })
        }
      })
      .catch((error) => {
        toast.error('Error when trying to login.')
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
          navigate('/dashboard', { replace: true })
        }
      })
      .catch((error) => {
        toast.error('Error when trying to google login.')
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
          navigate('/dashboard', { replace: true })
        }
      })
      .catch((error) => {
        toast.error('Error when trying to facebook login.')
        console.log(error)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary" style={{ width: '420px' }}>
        <Row className="text-center">
          <Col>
            <Card className="text-dark py-3">
              <Card.Body className="text-center">
                <h1 className="mb-3">
                  <i className="bi bi-person-circle"></i>
                </h1>
                <h3 className="card-title mb-3">Login</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Username */}
                  <InputForm
                    type="text"
                    register={register}
                    errors={errors.email}
                    icon="bi bi-person-circle"
                    label="Email"
                    name="email"
                    validationRules={{ required: 'Email is required' }}
                  />

                  {/* Password */}
                  <InputForm
                    type="password"
                    register={register}
                    errors={errors.password}
                    icon="bi bi-key"
                    label="Password"
                    name="password"
                    validationRules={{ required: 'Password is required' }}
                  />

                  {/* Login Buttons */}
                  <Button type="submit" variant="dark" className="w-100">
                    Login
                  </Button>

                  <h5 className="card-title my-3">Or</h5>

                  {/* Social Media Authentication Buttons */}
                  <GoogleButton responseGoogle={responseGoogle} />
                  <FacebookButton responseFacebook={responseFacebook} />

                  <span className="card-title">
                    Do you need an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </span>
                  <br />
                  <span className="card-title">
                    Forgot your password?{' '}
                    <Link
                      to="/recover-password"
                      style={{ textDecoration: 'none' }}
                    >
                      Recover
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
