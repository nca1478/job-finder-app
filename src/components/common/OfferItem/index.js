// Dependencies
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Custom Dependencies
import noImage from '../../../assets/img/no-image.jpg'
import { extractCurrency } from '../../../helpers/utils'

export const OfferItem = (props) => {
  const { id, title, img, price, currency } = props

  return (
    <Col xs={10} sm={10} md={6} lg={3}>
      <Link
        to={`/offer/${id}/details`}
        className="text-decoration-none text-dark"
      >
        <Card className="animate__animated animate__fadeIn">
          <Card.Img variant="top" src={img ? img : noImage} />
          <Card.Body>
            <Card.Text className="text-center" style={{ height: '5rem' }}>
              {title}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center">
            <span className="h5 fw-bold">
              - {price} {extractCurrency(currency)} -
            </span>
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  )
}
