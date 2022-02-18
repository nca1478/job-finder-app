// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import queryString from 'query-string'

// Custom Dependencies
import { get } from '../../../config/api'
import { OfferItem } from '../../common/OfferItem'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const SearchPage = () => {
  const location = useLocation()
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const { q = '' } = queryString.parse(location.search)

  const fetchOffers = useCallback(async () => {
    await get(`/offers/search?q=${q}`)
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
  }, [q])

  useEffect(() => {
    fetchOffers().catch(console.error)
  }, [fetchOffers])

  return (
    <>
      <Col className="bg-primary">
        <Container className="p-4 bg-primary">
          <h3 className="text-center text-white">Job Offers Found</h3>
          <Row className="justify-content-center g-4 pt-2">
            {!loaded ? (
              <>
                <SpinnerBorder size="lg" variant="light" />
                <SpaceBlank height="52vh" />
              </>
            ) : offers.length > 0 ? (
              <>
                {offers.map((offer) => {
                  return <OfferItem key={offer.id} {...offer} />
                })}
              </>
            ) : (
              <Alert variant="danger" className="w-75">
                No job offers was found...
              </Alert>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
