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

// Custom Dependencies
import { AuthContext } from '../../../auth/authContext'
import { get } from '../../../config/api'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { ContactModal } from './common/ContactModal'
import { DescriptionModal } from './common/DescriptionModal'
import noImage from '../../../assets/img/no-image.jpg'

export const OfferPage = () => {
  const navigate = useNavigate()
  const { offerId } = useParams()
  const [offer, setOffer] = useState({})
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const { user } = useContext(AuthContext)
  const [loaded, setLoaded] = useState(false)
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
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
        setShowContactInfo(true)
      })
  }

  const handleShowContactInfo = () => {
    if (user.logged) {
      fetchUser(offer.user.id)
    } else {
      navigate('/login', { replace: true })
    }
  }
  const handleCloseContactInfo = () => setShowContactInfo(false)

  const handleShowDescription = () => {
    setShowDescription(true)
  }

  const handleCloseDescription = () => {
    setShowDescription(false)
  }

  return (
    <Container>
      {!loaded ? (
        <Row className="justify-content-center mt-5">
          <>
            <SpinnerBorder size="lg" variant="dark" />
            <SpaceBlank height="400px" />
          </>
        </Row>
      ) : (
        <Row className="py-5">
          <Col md="6" sm="12">
            <Image
              className="mb-3"
              src={offer.img ? offer.img : noImage}
              style={{ width: '520px', height: '320px' }}
              thumbnail
              fluid
            />
          </Col>

          <Col md="6" sm="12">
            <h2 className="mb-2">
              {offer.title}{' '}
              <span className="fw-bold">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={handleShowDescription}
                >
                  <span className="fw-bold">
                    <i className="bi bi-eye"></i> Details
                  </span>
                </Button>
              </span>
            </h2>

            <Row>
              <ListGroup as="ul" variant="flush" className="lead">
                <ListGroup.Item>
                  <span className="fw-bold">Skills:</span>{' '}
                  {offer.skills.map((skill) => {
                    return (
                      <Badge key={skill.id} pill bg="dark" className="mx-1">
                        {skill.name}
                      </Badge>
                    )
                  })}
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="fw-bold">Sectors:</span>{' '}
                  {offer.sectors.map(
                    (sector, index) =>
                      sector.name +
                      `${index < offer.sectors.length - 1 ? ', ' : ' '}`
                  )}
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

                <ListGroup.Item>
                  <span className="fw-bold">Country:</span> {offer.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">State:</span> {offer.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bold">City:</span> {offer.city}
                </ListGroup.Item>

                {/* Modals */}
                <ContactModal
                  show={showContactInfo}
                  handleClose={handleCloseContactInfo}
                  userProfile={userProfile}
                />

                <DescriptionModal
                  show={showDescription}
                  handleClose={handleCloseDescription}
                  description={offer.description}
                />

                <ListGroup.Item>
                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={handleShowContactInfo}
                  >
                    <i className="bi bi-eye"></i> Contact Information
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
