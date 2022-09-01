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
        toast.error('Verifica los datos ingresados ​​y vuelve a intentarlo.')
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
                <h3 className="card-title mb-3">Crear una Cuenta</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {/* Fullname */}
                  <InputGroupForm
                    type="text"
                    register={register}
                    errors={errors.name}
                    icon="bi bi-person-circle"
                    label="Nombre Completo"
                    name="name"
                    validationRules={{
                      required: 'Nombre Completo es requerido',
                    }}
                  />

                  {/* Email */}
                  <InputGroupForm
                    type="email"
                    register={register}
                    errors={errors.email}
                    icon="bi bi-envelope"
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
                    label="Password"
                    name="password"
                    validationRules={{
                      required: 'Contraseña es requerida',
                      minLength: {
                        value: 8,
                        message:
                          'La contraseña debe tener al menos 8 caracteres',
                      },
                    }}
                  />

                  {/* Confirm Password */}
                  <InputGroupForm
                    type="password"
                    register={register}
                    errors={errors.confirm}
                    icon="bi bi-key"
                    label="Confirmar Contraseña"
                    name="confirm"
                    validationRules={{
                      required: 'Contraseña es requerida',
                      minLength: {
                        value: 8,
                        message:
                          'La contraseña debe tener al menos 8 caracteres',
                      },
                      validate: (value) =>
                        value === getValues('password') ||
                        'Las contraseñas no coinciden',
                    }}
                  />

                  {/* Register Button */}
                  <Button type="submit" variant="dark" className="w-100 mb-3">
                    Registrar
                  </Button>

                  <span className="card-title">
                    ¿Ya tienes una cuenta?{' '}
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
