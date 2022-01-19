// Dependencies
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Custom Dependencies
import noImage from '../../../assets/img/no-image.jpg'

export const OfferItem = (props) => {
  const { id, title, img } = props

  return (
    <Col sm={12} md={6} lg={3}>
      <Card>
        <Card.Img variant="top" src={img ? img : noImage} />
        <Card.Body>
          <Card.Text className="h5 text-center">{title}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/offer/${id}/details`} className="btn btn-dark">
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  )
}
