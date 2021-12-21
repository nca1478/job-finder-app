// Dependencies
import { useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Components
import { DashboardItem } from '../../common/DashboardItem'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

// Api Config
import { get } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])

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
        toast.error('Error try to fetching data.')
        console.log(error)
      })
  }

  return (
    <>
      <Col className="bg-light">
        <Container className="p-4 bg-light">
          <h2 className="text-center">Dashboard</h2>
          <Row className="justify-content-center g-4 mt-2">
            {offers.length > 0 ? (
              offers.map((offer) => {
                return (
                  <DashboardItem
                    key={offer.id}
                    {...offer}
                    fetchOffers={fetchOffers}
                  />
                )
              })
            ) : (
              <>
                <Alert variant="danger" className="w-75">
                  Oh no.... There are no job offers to show. Come back soon...
                </Alert>
                <SpaceBlank height="260px" />
              </>
            )}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
