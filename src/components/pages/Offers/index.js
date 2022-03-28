// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { get } from '../../../config/api'
import { OfferItem } from '../../common/OfferItem'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { Paginate } from '../../common/Paginate/Paginate'

export const OffersPage = () => {
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  const initialFetchOffers = useCallback(async () => {
    await get(`/offers/published?status=true&page=1&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPageCount(Math.ceil(response.data.count / limit))
          setOffers(response.data.rows)
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
    window.scrollTo(0, 0)
    initialFetchOffers().catch(console.error)
  }, [initialFetchOffers])

  const fetchOffers = async (currentPage) => {
    get(`/offers/published?status=true&page=${currentPage}&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setOffers(response.data.rows)
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

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1
    await fetchOffers(currentPage)
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h3 className="text-center text-white">All Job Offers</h3>
        <Row className="d-flex justify-content-center g-4 pt-2 g-4 pt-2">
          {!loaded ? (
            <SpinnerBorder size="lg" variant="light" />
          ) : offers.length > 0 ? (
            <>
              {offers.map((offer) => {
                return <OfferItem key={offer.id} {...offer} />
              })}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <Alert variant="danger" className="w-75">
              Oh no.... There are no job offers to show. Come back soon...
            </Alert>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
