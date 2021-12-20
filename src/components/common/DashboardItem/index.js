// Dependencies
import { Link } from 'react-router-dom'
import { Row, Col, Card, Stack, Button } from 'react-bootstrap'

export const DashboardItem = ({ title }) => {
  const handlePublish = () => {
    alert('Publishing Offer')
  }

  const handleDelete = () => {
    window.confirm('Are you sure?')
  }

  return (
    <Col lg={9} sm={12}>
      <Card>
        <Card.Body>
          <Row>
            <Col className="d-flex align-items-center text-center justify-content-between">
              <img
                className="img-thumbnail d-none d-md-block"
                src="https://picsum.photos/id/1/170/100"
                alt=""
              />
              <p className="card-text h5">{title}</p>
              <Stack direction="horizontal" gap={1}>
                <Button variant="dark" size="sm" onClick={handlePublish}>
                  Publish
                </Button>
                <Link to="/offer/edit" className="btn btn-primary btn-sm">
                  Edit
                </Link>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
}
