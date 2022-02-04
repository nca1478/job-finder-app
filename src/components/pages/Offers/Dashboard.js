// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { get, put, del } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { DashboardItem } from '../../common/DashboardItem'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { Paginate } from '../../common/Paginate/Paginate'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 4

  const fetchData = useCallback(async () => {
    get(`/offers?page=1&limit=${limit}`, user.data.token)
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

  const fetchOffers = async (page) => {
    get(`/offers?page=${page}&limit=${limit}`, user.data.token)
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

  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData])

  const handlePublish = (id, published) => {
    const isPublished = published === false ? 'true' : 'false'

    put(`/offers/${id}/publish?status=${isPublished}`, {}, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error try to publishing job offer.')
        console.log(error)
      })
      .finally(() => {
        fetchOffers(currentPage)
      })
  }

  const handleDelete = (offerId) => {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      del(`/offers/${offerId}`, user.data.token)
        .then((response) => {
          if (response.data === null) {
            toast.error(response.errors.msg)
          } else {
            toast.info(response.data.msg)
          }
        })
        .catch((error) => {
          toast.error('Error try to deleting job offer.')
          console.log(error)
        })
        .finally(() => {
          fetchData()
        })
    }
  }

  const handlePageClick = async (data) => {
    let page = data.selected + 1
    await fetchOffers(page)
    setCurrentPage(page)
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">Dashboard</h2>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="400px" />
            </>
          ) : offers.length > 0 ? (
            <>
              {offers.map((offer) => (
                <DashboardItem
                  {...offer}
                  key={offer.id}
                  handlePublish={handlePublish}
                  handleDelete={handleDelete}
                />
              ))}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />

              {offers.length === 1 && <SpaceBlank height="210px" />}
              {offers.length === 2 && <SpaceBlank height="60px" />}
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
