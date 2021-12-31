// Dependencies
import { Col, Row, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Assets
import noImage from '../../../assets/img/no-image.png'

export const OfferItem = (props) => {
  const { id, title, description, img } = props

  return (
    <Col lg={9} sm={12}>
      <Card>
        <Card.Header className="h5 text-center">{title}</Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex align-items-center text-center justify-content-between">
              <img
                className="img-thumbnail d-none d-md-block"
                src={img ? img : noImage}
                style={{ width: '170px', height: '100px' }}
                alt=""
              />
              <p className="card-text">{description}</p>

              <Link to={`/offer/${id}/details`} className="btn btn-dark">
                Details
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}
