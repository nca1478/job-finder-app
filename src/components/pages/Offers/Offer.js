// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Badge,
} from 'react-bootstrap'

// Custom Dependencies
import { get } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { ContactModal } from './components/ContactModal'
import { DescriptionModal } from './components/DescriptionModal'
import { extractCurrency } from '../../../helpers/utils'
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
  const location = useLocation()

  const initialFetchOffers = useCallback(async (offerId) => {
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
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    initialFetchOffers(offerId).catch(console.error)
    sessionStorage.setItem('joboffer-path', location.pathname)
  }, [initialFetchOffers, location, offerId])

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
            <SpaceBlank height="64vh" />
          </>
        </Row>
      ) : (
        <Row className="py-5 animate__animated animate__fadeIn">
          <Col md="6" sm="12">
            <Image
              className="mb-3"
              src={offer.img ? offer.img : noImage}
              style={{ width: '30.5rem', height: 'auto' }}
              thumbnail
              fluid
            />
          </Col>

          <Col md="6" sm="12">
            <h2 className="mb-2 text-center text-sm-start">
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
                  <span className="fw-bold">Job Price:</span>{' '}
                  <span className="fw-bold h3">
                    {offer.price} {extractCurrency(offer.currency)}
                  </span>
                </ListGroup.Item>

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
                    <i className="bi bi-eye"></i> User Information
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
