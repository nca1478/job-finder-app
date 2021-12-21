// Dependencies
import { useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Components
import { OfferItem } from '../../common/OfferItem'

// Api Config
import { get } from '../../../config/api'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const OffersPage = () => {
  const [offers, setOffers] = useState([])

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
        toast.error('Error try to fetching data.')
        console.log(error)
      })
  }

  return (
    <>
      <Col className="bg-light">
        <Container className="p-4 bg-light">
          <h2 className="text-center">Job Offers</h2>
          <Row className="justify-content-center g-4 pt-2">
            {offers.length > 0 ? (
              offers.map((offer) => {
                return <OfferItem key={offer.id} {...offer} />
              })
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
    </>
  )
}
