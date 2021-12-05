import { useState } from 'react'
import { Link } from 'react-router-dom'
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

export const LoginPage = () => {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
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
              <h3 className="card-title mb-3">Login</h3>

              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="mx-3"
              >
                <Row>
                  <InputGroup className="mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-person-circle"></i>
                    </span>
                    <FormControl
                      id="username"
                      placeholder="Username"
                      required
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter your username
                    </Form.Control.Feedback>
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-key"></i>
                    </span>
                    <FormControl
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Enter your password
                    </Form.Control.Feedback>
                  </InputGroup>

                  <div className="d-grid gap-2 mb-3">
                    <Button type="submit" variant="dark">
                      Login
                    </Button>
                  </div>

                  <h5 className="card-title mb-3">Or</h5>

                  <div className="d-grid gap-2 mb-3">
                    <Button variant="danger">
                      <i className="bi bi-google"></i> Login with Google
                    </Button>
                  </div>

                  <div className="d-grid gap-2 mb-3">
                    <Button variant="primary">
                      <i className="bi bi-facebook"></i> Login with Facebook
                    </Button>
                  </div>

                  <span className="card-title">
                    Do you need an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </span>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
