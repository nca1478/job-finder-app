// Dependencies
import { Col, Row, Form, Container, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// Custom Dependencies
import { InputForm } from './common/InputForm'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { put } from '../../../config/api'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'

export const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = (data) => {
    setLoading(true)
    put('/users/recovery', data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
          reset()
        }
      })
      .catch((error) => {
        toast.error('Error when trying to send email.')
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary" style={{ width: '420px' }}>
        <Row className="text-center my-5">
          <Col>
            <Card className="text-dark py-3">
              <Card.Body className="text-center">
                <h1 className="mb-3">
                  <i className="bi bi-card-text"></i>
                </h1>
                <h3 className="card-title mb-3">Recover Password</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {loading ? (
                    <>
                      <SpinnerBorder />
                      <SpaceBlank height="11.2vh" />
                    </>
                  ) : (
                    <>
                      {/* Email */}
                      <InputForm
                        type="email"
                        register={register}
                        errors={errors.email}
                        icon="bi bi-person-circle"
                        label="Email"
                        name="email"
                        validationRules={{ required: 'Email is required' }}
                      />

                      <Button
                        type="submit"
                        variant="dark"
                        className="w-100 my-2"
                      >
                        Send Email
                      </Button>
                    </>
                  )}

                  <span className="card-title">
                    Do you need an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </span>
                </Form>
              </Card.Body>
            </Card>
            <SpaceBlank height="3.2vh" />
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
