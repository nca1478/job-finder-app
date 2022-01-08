// Dependencies
import { useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Fetch Config
import { get } from '../../../config/api'

// Components
import { OfferItem } from '../../common/OfferItem'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const OffersPage = () => {
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = () => {
    get('/offers/published?status=true')
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setOffers(response.data)
        }
      })
      .catch((error) => {
        toast.error('Error try to fetching job offers.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">Job Offers</h2>
        <Row className="d-flex justify-content-center g-4 pt-3">
          {!loaded ? (
            <SpinnerBorder />
          ) : offers.length > 0 ? (
            <>
              {offers.map((offer) => {
                return (
                  <>
                    <OfferItem key={offer.id} {...offer} />
                  </>
                )
              })}
              <SpaceBlank height="60px" />
            </>
          ) : (
            <>
              <Alert variant="danger" className="w-75">
                Oh no.... There are no job offers to show. Come back soon...
              </Alert>
              <SpaceBlank height="270px" />
            </>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
