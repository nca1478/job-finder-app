// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Fetch Config
import { post } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

// Types Reducer
import { types } from '../../../types/types'

// Components
import { InputForm } from './common/InputForm'

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
        toast.error('Please verify the data entered and try again.')
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

                  <Button type="button" variant="danger" className="w-100 mb-3">
                    <i className="bi bi-google"></i> Login with Google
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    className="w-100 mb-3"
                  >
                    <i className="bi bi-facebook"></i> Login with Facebook
                  </Button>

                  <span className="card-title">
                    Do you need an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Register
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
