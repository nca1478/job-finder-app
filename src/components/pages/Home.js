// Dependencies
import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Components
import { OfferItem } from '../common/OfferItem'
import { Showcase } from '../common/Showcase'

// Api Config
import { get } from '../../config/api'

export const HomePage = () => {
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
      <Showcase />
      <Col className="p-5 bg-primary">
        <Container>
          <h2 className="text-center text-white mb-4">Last Job Offers</h2>
          <Row className="g-4 justify-content-center">
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
