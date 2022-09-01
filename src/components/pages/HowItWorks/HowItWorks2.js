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
    <div className="animate__animated animate__fadeIn">
      <h2 className="text-center pt-4">Publicar una Oferta de Trabajo</h2>
      <hr />
      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage3} className="img-fluid w-75" alt="" />
            </Col>
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>1. Regístrese o inicie sesión en la aplicación.</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-dark text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>2. Agregue una nueva oferta de trabajo.</h2>
            </Col>
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage5} className="img-fluid" alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4 bg-primary text-white">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage6} className="img-fluid w-75" alt="" />
            </Col>
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>3. Vaya al Dashboard y publique una oferta de trabajo</h2>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="align-items-center justify-content-center py-4">
            <Col md={6} sm={12} className="text-center text-md-start">
              <h2>4. Listo. Espere a que un cliente lo contacte.</h2>
            </Col>
            <Col md={6} sm={12} className="d-none d-md-block">
              <img src={hiwImage7} className="img-fluid w-75" alt="" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
