// Dependencies
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'

// Custom Dependencies
import showcase from '../../../assets/img/showcase.svg'

export const Showcase = () => {
  return (
    <Col className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
      <Container>
        <Row className="d-sm-flex align-items-center justify-content-between">
          <Col>
            <h1>
              Encuentra los mejores servicios freelance{' '}
              <span className="text-warning">para tu empresa</span>
            </h1>
            <p className="lead my-4">
              Jobfinder te permitirá publicar tus trabajos y contactar a los
              interesados desde cualquier parte del mundo
            </p>

            <Link to="/offers" className="btn btn-primary btn-lg">
              Consulta nuestros trabajos
            </Link>
          </Col>
          <img
            className="img-fluid w-50 d-none d-md-block"
            src={showcase}
            alt="showcase"
          />
        </Row>
      </Container>
    </Col>
  )
}
