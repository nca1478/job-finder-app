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
              Find the perfect freelance services{' '}
              <span className="text-warning">for your business</span>
            </h1>
            <p className="lead my-4">
              Jobfinder allows you to post your jobs and contact interested
              people around the world
            </p>

            <Link to="/offers" className="btn btn-primary btn-lg">
              View our Job Offers
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
