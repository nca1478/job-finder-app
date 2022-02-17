// Dependencies
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Custom Dependencies
import infoImage1 from '../../../assets/img/info1.svg'

export const InfoSection1 = () => {
  return (
    <section className="p-5">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6} sm={12}>
            <img
              src={infoImage1}
              className="img-fluid d-sm-none d-md-block"
              alt=""
            />
          </Col>
          <Col md={6} sm={12} className="text-center">
            <h2>How it Works Job Finder?</h2>
            <p className="lead">
              We show you how is the process of searching and publishing a job
              offer.
            </p>
            <div className="text-center">
              <Link to="/howitworks1" className="btn btn-primary m-1">
                Find a Job Offer
              </Link>
              <Link to="/howitworks2" className="btn btn-dark m-1">
                Publish a Job Offer
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
