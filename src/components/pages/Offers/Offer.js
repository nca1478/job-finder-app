// Dependencies
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

// Context
import { AuthContext } from '../../../auth/authContext'

// Fetch Config
import { get } from '../../../config/api'

// Components
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { Contactform } from './common/ContactForm'

export const OfferPage = () => {
  const navigate = useNavigate()
  const { offerId } = useParams()
  const [offer, setOffer] = useState({})
  const [show, setShow] = useState(false)
  const { user } = useContext(AuthContext)
  const [loaded, setLoaded] = useState(false)
  const [userProfile, setUserProfile] = useState({})

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

  const fetchUser = async (userId) => {
    await get(`/users/${userId}`, user.data.token)
      .then((response) => {
        setUserProfile(response.data)
      })
      .catch((error) => {
        toast.error('Error try to fetching user profile.')
        console.log(error)
      })
      .finally(() => {
        setShow(true)
      })
  }

  const handleClose = () => setShow(false)

  const handleContact = () => {
    if (user.logged) {
      fetchUser(offer.user.id)
    } else {
      navigate('/login', { replace: true })
    }
  }

  return (
    <Container>
      {!loaded ? (
        <Row className="justify-content-center mt-5">
          <SpinnerBorder />
        </Row>
      ) : (
        <Row className="py-5">
          <Col md="6" sm="12">
            <Image
              className="mb-3"
              src="https://picsum.photos/id/1/520/320"
              thumbnail
              fluid
            />
          </Col>
          <Col md="6" sm="12">
            <h2 className="mb-2">{offer.title}</h2>
            <h5>{offer.description}</h5>

            <Row>
              <ListGroup as="ul" variant="flush" className="lead">
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
                  <span className="fw-bold">Currency:</span> {offer.currency}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">Period:</span> {offer.period}
                </ListGroup.Item>

                {/* Modal */}
                <Contactform
                  show={show}
                  handleClose={handleClose}
                  userProfile={userProfile}
                />

                <ListGroup.Item>
                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={handleContact}
                  >
                    Contact Info
                  </Button>
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
