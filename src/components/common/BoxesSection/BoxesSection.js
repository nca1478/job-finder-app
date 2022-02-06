// Dependencies
import { Container, Row, Col } from 'react-bootstrap'

// Custom Dependencies
import { Box } from '../Box/Box'
import textBox from './text.json'

export const BoxesSection = () => {
  return (
    <section className="p-5 bg-primary">
      <Container>
        <h2 className="text-center text-white mb-4">Why Job Finder?</h2>
        <Row className="text-center g-4">
          <Col md={4} sm={12}>
            <Box
              bgColor="bg-dark"
              textColor="text-light"
              title="Easy"
              icon="bi bi-emoji-smile"
              bodyText={textBox[0].body}
              buttonColor="btn-primary"
              buttonText="View Offers"
              goTo="/offers"
            />
          </Col>

          <Col md={4} sm={12}>
            <Box
              bgColor="bg-secondary"
              textColor="text-light"
              title="Fast"
              icon="bi bi-speedometer"
              bodyText={textBox[1].body}
              buttonColor="btn-dark"
              buttonText="View Offers"
              goTo="/offers"
            />
          </Col>

          <Col md={4} sm={12}>
            <Box
              bgColor="bg-dark"
              textColor="text-light"
              title="Secure"
              icon="bi bi-shield-check"
              bodyText={textBox[2].body}
              buttonColor="btn-primary"
              buttonText="View Offers"
              goTo="/offers"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
