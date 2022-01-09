// Dependencies
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

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
    console.log(facebookData)
    // post('/users/facebook', facebookData)
    //     .then((response) => {
    //         if (response.data === null) {
    //             notification['error']({
    //                 message: 'Login Error',
    //                 description: 'An error has occurred starting the facebook session.',
    //             });
    //         } else {
    //             const dataUser = {
    //                 token: response.data.token,
    //                 ...response.data.user,
    //             };
    //             authenticate(dataUser, () => {
    //                 history.replace(from);
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         notification['error']({
    //             message: 'Login Error',
    //             description: 'An error has occurred starting the facebook session.',
    //         });
    //         console.log(error);
    //     });
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

                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <Button
                        type="button"
                        variant="danger"
                        className="w-100"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <i className="bi bi-google"></i> Login with Google
                      </Button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />

                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    callback={responseFacebook}
                    cssClass="button-submit facebook-button"
                    textButton={<span>Login with Facebook</span>}
                    icon="fa-facebook"
                  />

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
