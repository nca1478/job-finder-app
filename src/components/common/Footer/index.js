// Dependencies
import { Col, Container } from 'react-bootstrap'

export const Footer = () => {
  return (
    <Col className="p-3 bg-dark text-white text-center bottom-0">
      <Container>
        <p className="lead pt-2">Copyright &copy; 2022 Job Finder App</p>
      </Container>
    </Col>
  )
}
