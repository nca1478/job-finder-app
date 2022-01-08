// Dependencies
import { useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Fetch Config
import { get, put, del } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

// Components
import { DashboardItem } from '../../common/DashboardItem'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchOffers = () => {
    get('/offers', user.data.token)
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
        fetchOffers()
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
          fetchOffers()
        })
    }
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">Dashboard</h2>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <SpinnerBorder />
          ) : offers.length > 0 ? (
            offers.map((offer) => {
              return (
                <>
                  <DashboardItem
                    {...offer}
                    key={offer.id}
                    handlePublish={handlePublish}
                    handleDelete={handleDelete}
                  />
                  {offers.length > 0 && offers.length < 3 && (
                    <SpaceBlank height="210px" />
                  )}
                </>
              )
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
  )
}
