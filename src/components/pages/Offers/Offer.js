// Dependencies
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Badge,
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Fetch Config
import { get } from '../../../config/api'

// Components
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'

export const OfferPage = () => {
  const { offerId } = useParams()
  const [offer, setOffer] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchOffer(offerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchOffer = async (offerId) => {
    await get(`/offers/${offerId}`)
      .then((response) => {
        setOffer(response.data)
      })
      .catch((error) => {
        toast.error('Error try to fetching job offer.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  return (
    <Container>
      {!loaded ? (
        <Row className="justify-content-center mt-5">
          <SpinnerBorder />
        </Row>
      ) : (
        <Row className="py-5">
          <Col>
            <Image src="https://picsum.photos/id/1/520/320" thumbnail fluid />
          </Col>
          <Col>
            <h2 className="mb-2">{offer.title}</h2>
            <h5>{offer.description}</h5>

            <Row>
              <ListGroup as="ul" variant="flush" className="lead">
                <ListGroup.Item>
                  <Row>
                    <Col md="9">
                      <span className="fw-bold">Freelancer:</span>{' '}
                      {loaded && offer.user.name}
                    </Col>
                    <Col md="3" className="text-end">
                      <Button variant="primary">Contact Info</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Sectors:</span>{' '}
                  {offer.sectors.map((sector) => {
                    return (
                      <Badge key={sector.id} pill bg="dark" className="mx-1">
                        {sector.name}
                      </Badge>
                    )
                  })}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Country:</span> {offer.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">State:</span> {offer.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">City:</span> {offer.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Experience:</span>{' '}
                  {offer.experience}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Contract:</span> {offer.contract}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Salary:</span> {offer.payment}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Period:</span> {offer.period}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Currency:</span> {offer.currency}
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Row>
      )}
      <ToastContainer />
    </Container>
  )
}
