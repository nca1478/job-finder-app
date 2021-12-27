// Dependencies
import { Col, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const OfferItem = (props) => {
  const { id, title, description } = props

  return (
    <Col lg={9} sm={12}>
      <Card>
        <Card.Header className="h5 text-center">{title}</Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex align-items-center text-center justify-content-between">
              <img
                className="img-thumbnail d-none d-md-block"
                src="https://picsum.photos/id/1/170/100"
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
