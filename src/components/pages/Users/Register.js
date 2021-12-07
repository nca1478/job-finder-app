// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Api
import { post } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

// Types Reducer
import { types } from '../../../types/types'

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    // post('/users/login', data)
    //   .then((response) => {
    //     if (response.data === null) {
    //       toast.error(response.errors.msg)
    //     } else {
    //       const dataUser = {
    //         token: response.data.token,
    //         ...response.data.user,
    //       }
    //       dispatch({
    //         type: types.login,
    //         payload: { data: dataUser },
    //       })
    //       navigate('/dashboard', { replace: true })
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error('Please verify the data entered and try again.')
    //     console.log(error)
    //   })
  }

  return (
    <Container className="my-4" style={{ width: '420px' }}>
      <Row className="text-center">
        <Col>
          <Card className="text-dark py-3">
            <Card.Body className="text-center">
              <h1 className="mb-3">
                <i className="bi bi-person-circle"></i>
              </h1>
              <h3 className="card-title mb-3">Create an Account</h3>

              <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                {/* Fullname */}
                <InputGroup className="mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <FormControl
                    placeholder="Fullname"
                    {...register('name', { required: true })}
                    autoComplete="off"
                  />
                  {errors.name && (
                    <Form.Text className="text-danger w-100">
                      Fullname is required
                    </Form.Text>
                  )}
                </InputGroup>

                {/* Email */}
                <InputGroup className="mb-3">
                  <span className="input-group-text">
                    <i className="bi bi bi-envelope"></i>
                  </span>
                  <FormControl
                    placeholder="Email"
                    {...register('email', { required: true })}
                    autoComplete="off"
                  />
                  {errors.email && (
                    <Form.Text className="text-danger w-100">
                      Email is required
                    </Form.Text>
                  )}
                </InputGroup>

                {/* Password */}
                <InputGroup className="mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger w-100">
                      Password is required
                    </Form.Text>
                  )}
                </InputGroup>

                {/* Confirm Password */}
                <InputGroup className="mb-3">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <FormControl
                    type="confirm"
                    placeholder="Confirm Password"
                    {...register('confirm', { required: true })}
                  />
                  {errors.confirm && (
                    <Form.Text className="text-danger w-100">
                      Password is required
                    </Form.Text>
                  )}
                </InputGroup>

                {/* Register Button */}
                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Register
                </Button>

                <span className="card-title">
                  Do you already have an account?{' '}
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    Login
                  </Link>
                </span>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}
