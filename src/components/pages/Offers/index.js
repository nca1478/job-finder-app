// Dependencies
import { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Components
import { OfferItem } from '../../common/OfferItem'

// Api Config
import { get } from '../../../config/api'

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
            {offers.map((offer) => {
              return <OfferItem key={offer.id} {...offer} />
            })}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
