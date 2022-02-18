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
import { redirectPageOffers } from '../../../helpers/utils'

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
          redirectPageOffers(dataUser, navigate)
        }
      })
      .catch((error) => {
        toast.error('Please verify the data entered and try again.')
        console.log(error)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="text-center">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-dark py-3">
              <Card.Body className="text-center">
                <h1 className="mb-3">
                  <i className="bi bi-person-circle"></i>
                </h1>
                <h3 className="card-title mb-3">Create an Account</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Fullname */}
                  <InputGroupForm
                    type="text"
                    register={register}
                    errors={errors.name}
                    icon="bi bi-person-circle"
                    label="Fullname"
                    name="name"
                    validationRules={{ required: 'Fullname is required' }}
                  />

                  {/* Email */}
                  <InputGroupForm
                    type="email"
                    register={register}
                    errors={errors.email}
                    icon="bi bi-envelope"
                    label="Email"
                    name="email"
                    validationRules={{ required: 'Email is required' }}
                  />

                  {/* Password */}
                  <InputGroupForm
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
                  <InputGroupForm
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
                  <Button type="submit" variant="dark" className="w-100 mb-3">
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
    </Col>
  )
}
