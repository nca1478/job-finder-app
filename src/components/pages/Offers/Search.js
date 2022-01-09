// Dependencies
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Row, Col, Container, Alert } from 'react-bootstrap'

// Fetch Config
import { get } from '../../../config/api'

// Components
import { OfferItem } from '../../common/OfferItem'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const SearchPage = () => {
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()
  const { q = '' } = queryString.parse(location.search)

  useEffect(() => {
    fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const fetchOffers = () => {
    get(`/offers/search?q=${q}`)
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
    <>
      <Col className="bg-primary">
        <Container className="p-4 bg-primary">
          <h2 className="text-center text-white">Job Offers</h2>
          <Row className="justify-content-center g-4 pt-2">
            {!loaded ? (
              <SpinnerBorder />
            ) : offers.length > 0 ? (
              offers.map((offer) => {
                return (
                  <>
                    <OfferItem key={offer.id} {...offer} />
                    {offers.length > 0 && offers.length < 3 && (
                      <SpaceBlank height="200px" />
                    )}
                  </>
                )
              })
            ) : (
              <>
                <Alert variant="danger" className="w-75">
                  Oh no.... There are no job offers to show, try later...
                </Alert>
                <SpaceBlank height="270px" />
              </>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}