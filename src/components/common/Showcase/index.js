// Dependencies
import { Link } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'

// Assets
import showcase from '../../../assets/img/showcase.svg'

export const Showcase = () => {
  return (
    <Col className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
      <Container>
        <Row className="d-sm-flex align-items-center justify-content-between">
          <Col>
            <h1>
              Shows you <span className="text-warning">all Jobs</span>
            </h1>
            <p className="lead my-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
              adipisci doloribus qui tempore. Accusamus eius cumque iste facere
              error magni quod atque minima dolores sapiente! Placeat rem
              consequuntur excepturi culpa.
            </p>

            <Link to="/offers" className="btn btn-primary btn-lg">
              View Job Offers
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
