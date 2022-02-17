// Dependencies
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Custom Dependencies
import hiwImage3 from '../../../assets/img/howitworks3.svg'
import hiwImage5 from '../../../assets/img/howitworks5.svg'
import hiwImage6 from '../../../assets/img/howitworks6.svg'
import hiwImage7 from '../../../assets/img/howitworks7.svg'

export const HowItWorksPage2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <h2 className="text-center py-4">Publish a Job Offer</h2>
      <hr />
      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-5">
            <Col md={6}>
              <img
                src={hiwImage3}
                className="img-fluid w-75 d-sm-none d-md-block w-50"
                alt=""
              />
            </Col>
            <Col md={6} sm={12}>
              <h2>1. Sign up or Sign in to the App.</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-dark text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-5">
            <Col md={6} sm={12}>
              <h2>2. Add a New Job Offer.</h2>
            </Col>
            <Col md={6}>
              <img
                src={hiwImage5}
                className="img-fluid w-75 d-sm-none d-md-block w-100"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-primary text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-5">
            <Col md={6} sm={12}>
              <h2>3. Go to the Dashboard and Publish a Job Offer</h2>
            </Col>
            <Col md={6}>
              <img
                src={hiwImage6}
                className="img-fluid w-75 d-sm-none d-md-block"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-5">
            <Col md={6}>
              <img
                src={hiwImage7}
                className="img-fluid w-75 d-sm-none d-md-block"
                alt=""
              />
            </Col>
            <Col md={6} sm={12}>
              <h2>4. Ready. Wait for a Customer to Contact You.</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
