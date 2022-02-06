// Dependencies
import { Col, Container, Row } from 'react-bootstrap'

// Custom Dependencies
import infoImage from '../../../assets/img/info1.svg'

export const InfoSection1 = () => {
  return (
    <section className="p-5">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6}>
            <img
              src={infoImage}
              className="img-fluid w-75 d-sm-none d-md-block"
              alt=""
            />
          </Col>
          <Col md={6} sm={12}>
            <h2>Find Job Offers Quickly</h2>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              repudiandae quam voluptates ullam modi. Cumque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
              exercitationem in voluptatibus ducimus eveniet nisi eos
              aspernatur. Laborum tempora, maiores quidem nesciunt inventore
              assumenda, alias cum eaque pariatur consequuntur sed.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
