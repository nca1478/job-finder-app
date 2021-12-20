// Dependencies
import { useContext, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

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
    get('/offers', user.data.token).then((data) => {
      setOffers(data.data)
    })
  }

  return (
    <>
      <Col className="bg-light">
        <Container className="p-4 bg-light">
          <h2 className="text-center">Dashboard</h2>
          <Row className="justify-content-center g-4 mt-2">
            {offers.map((offer) => {
              return <DashboardItem key={offer.id} {...offer} />
            })}
          </Row>
        </Container>
      </Col>
    </>
  )
}
