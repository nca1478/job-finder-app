// Dependencies
import { useContext, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Components
import { DashboardItem } from '../../common/DashboardItem'

// Api Config
import { get } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])

  useEffect(() => {
    fetchOffers()
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
            {offers.map((offer) => {
              return (
                <DashboardItem
                  key={offer.id}
                  {...offer}
                  fetchOffers={fetchOffers}
                />
              )
            })}
          </Row>
        </Container>
        <ToastContainer />
      </Col>
    </>
  )
}
