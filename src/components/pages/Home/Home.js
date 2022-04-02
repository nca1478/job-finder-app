// Dependencies
import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { get } from '../../../config/api'
import { OfferItem } from '../../common/OfferItem'
import { Showcase } from '../../common/Showcase'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { BoxesSection } from '../../common/BoxesSection/BoxesSection'
import { InfoSection1 } from '../../common/InfoSection1/InfoSection1'
import { FaqSection } from '../../common/FaqSection/FaqSection'

export const HomePage = () => {
  const lastOffers = 4
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)

  const fetchOffers = useCallback(async () => {
    await get(`/offers/lastOffers?limit=${lastOffers}`)
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
  }, [])

  useEffect(() => {
    fetchOffers().catch(console.error)
    sessionStorage.removeItem('joboffer-path')
  }, [fetchOffers])

  return (
    <>
      <Showcase />
      <BoxesSection />
      <InfoSection1 />
      <FaqSection />
      <Col className="bg-primary">
        <h2 className="text-center text-white mt-5 mb-4">Last Job Offers</h2>
        {!loaded ? (
          <Row className="justify-content-center m-5">
            <SpinnerBorder size="lg" variant="light" />
          </Row>
        ) : (
          <Container className="px-4 mb-5">
            <Row className="d-flex justify-content-center g-4 pt-2 ">
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
          </Container>
        )}
        <ToastContainer />
      </Col>
    </>
  )
}
