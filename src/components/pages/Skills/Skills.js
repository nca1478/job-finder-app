import { useState } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { ToastContainer, toast } from 'react-toastify'

export const SkillsPage = () => {
  const [loaded, setloaded] = useState(true)

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="d-flex justify-content-center pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="400px" />
            </>
          ) : (
            <Col>
              <Card className="text-dark">
                <Card.Header as="h5" className="text-center">
                  Skills
                </Card.Header>
                <Card.Body></Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
