// Dependencies
import { Col, Row, Form, Container, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import queryString from 'query-string'

// Custom Dependencies
import { decode } from '../../../helpers/jwt'
import { put } from '../../../config/api'
import { InputForm } from './common/InputForm'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm()
  const [token, setToken] = useState(false)
  const [infoToken, setInfoToken] = useState(null)
  const [errorToken, setErrorToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const { token = '' } = queryString.parse(location.search)

    // if (token === '') {
    // 		history.push('/404');
    // }

    const decodeToken = async () => {
      try {
        const decodedInfo = await decode(token)
        setInfoToken(decodedInfo)
      } catch (e) {
        setErrorToken(e)
      }
    }

    decodeToken()
    setToken(token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (data) => {
    const dataUser = {
      email: infoToken.email,
      newPassword: data.password,
    }

    setLoading(true)
    put(`/users/recovery/${token}`, dataUser)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
          reset()
        }
      })
      .catch((error) => {
        toast.error('Error when trying to change password.')
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
                  <i className="bi bi-check-square"></i>
                </h1>
                <h3 className="card-title mb-3">Change Password</h3>

                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  {loading ? (
                    <>
                      <SpinnerBorder />
                      <SpaceBlank height="20.8vh" />
                    </>
                  ) : (
                    <>
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

                      <Button
                        type="submit"
                        variant="dark"
                        className="w-100 my-2"
                      >
                        Save
                      </Button>
                    </>
                  )}

                  <span className="card-title">
                    Do you already have an account??{' '}
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
