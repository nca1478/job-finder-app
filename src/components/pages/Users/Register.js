// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Api
import { post } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

// Types Reducer
import { types } from '../../../types/types'

// Components
import { InputForm } from './common/InputForm'

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    post('/users', data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors[0].msg)
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
                <InputForm
                  type="text"
                  register={register}
                  errors={errors.name}
                  icon="bi bi-person-circle"
                  label="Fullname"
                  name="name"
                  validationRules={{ required: 'Fullname is required' }}
                />

                {/* Email */}
                <InputForm
                  type="email"
                  register={register}
                  errors={errors.email}
                  icon="bi bi-envelope"
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
                  validationRules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  }}
                />

                {/* Confirm Password */}
                <InputForm
                  type="password"
                  register={register}
                  errors={errors.confirm}
                  icon="bi bi-key"
                  label="Confirm Password"
                  name="confirm"
                  validationRules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                    validate: (value) =>
                      value === getValues('password') ||
                      'The passwords do not match',
                  }}
                />

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
