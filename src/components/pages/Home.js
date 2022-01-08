// Dependencies
import { useState, useEffect } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Api Config
import { get } from '../../config/api'

// Components
import { OfferItem } from '../common/OfferItem'
import { Showcase } from '../common/Showcase'
import { SpinnerBorder } from '../common/Spinners/SpinnerBorder'

export const HomePage = () => {
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
    <>
      <Showcase />
      <Col className="p-5 bg-primary">
        <Container>
          {!loaded ? (
            <Row className="justify-content-center mt-5">
              <SpinnerBorder />
            </Row>
          ) : (
            <>
              <h2 className="text-center text-white mb-4">Last Job Offers</h2>
              <Row className="d-flex justify-content-center g-4">
                {offers.length > 0 ? (
                  offers.map((offer) => {
                    return <OfferItem key={offer.id} {...offer} />
                  })
                ) : (
                  <Alert variant="danger" className="w-75">
                    Oh no.... There are no job offers to show. Come back soon...
                  </Alert>
                )}
              </Row>
            </>
          )}
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
