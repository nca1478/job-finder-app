// Dependencies
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'

export const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/', { replace: true })
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center m-auto">
      <Row className="animate__animated animate__fadeIn">
        <Col>
          <h1 className="text-404">404</h1>
          <h1 className="text-bold">¿Te perdiste en el camino?</h1>
          <h5 className="text-muted">
            Lo sentimos, no podemos encontrar esa página. Encontrará qué
            explorar en el página de inicio.
          </h5>

          <Button variant="primary" onClick={handleClick} className="mt-3">
            Ir a Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
