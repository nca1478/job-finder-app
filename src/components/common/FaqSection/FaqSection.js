// Dependencies
import { Accordion, Container } from 'react-bootstrap'

export const FaqSection = () => {
  return (
    <section id="questions" className="p-5 bg-dark">
      <Container>
        <h2 className="text-center text-white mb-4">Preguntas Frecuentes</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>¿Donde estan localizados?</Accordion.Header>
            <Accordion.Body>
              Puedes encontrarnos en nuestro sitio web www.jobfinder.com.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>¿Cuánto cuesta el servicio?</Accordion.Header>
            <Accordion.Body>
              El servicio es completamente gratuito.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>¿Qué necesito saber?</Accordion.Header>
            <Accordion.Body>
              Solo necesita dominar el trabajo que publica y saber como ofertar
              el trabajo.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>¿Cómo me registro?</Accordion.Header>
            <Accordion.Body>
              Al ingresar a la aplicación Jobfinder, localice el botón de
              registro/inicio de sesión. Con esto puedes tener acceso para ver
              la información de los freelancers para que puedas contactarlo y
              también puedes publicar ofertas de trabajo.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ¿Me ayudará a encontrar trabajo?
            </Accordion.Header>
            <Accordion.Body>Por supuesto, pero ten paciencia...</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  )
}
