// Dependencies
import { Accordion, Container } from 'react-bootstrap'

export const FaqSection = () => {
  return (
    <section id="questions" className="p-5 bg-dark">
      <Container>
        <h2 className="text-center text-white mb-4">
          Frecuently Asked Questions
        </h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Where exactly are you located?</Accordion.Header>
            <Accordion.Body>
              You can find us on our website www.jobfinder.com.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How much does the service cost?</Accordion.Header>
            <Accordion.Body>The service is completely free.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What do I need to know?</Accordion.Header>
            <Accordion.Body>
              You just need to master the job you post and know what job offer
              you are looking for.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>What do I sign up?</Accordion.Header>
            <Accordion.Body>
              Entering the jobfinder app, locate the signup/login button. With
              this you can have access to see the info of freelancers for you
              can contact it and you can publish job offers too.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Do you help me find a job?</Accordion.Header>
            <Accordion.Body>Of course, but be patient...</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  )
}
