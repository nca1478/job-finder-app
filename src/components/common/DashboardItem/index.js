// Dependencies
import { Link } from 'react-router-dom'
import { Row, Col, Card, Stack, Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

// Assets
import noImage from '../../../assets/img/no-image.png'

export const DashboardItem = (props) => {
  const { id, title, img, published, handlePublish, handleDelete } = props

  return (
    <Col lg={9} sm={12}>
      <Card>
        <Card.Body>
          <Row>
            <Col className="d-flex align-items-center text-center justify-content-between">
              <img
                className="img-thumbnail d-none d-md-block"
                src={img ? img : noImage}
                style={{ width: '170px', height: '100px' }}
                alt=""
              />
              <p className="card-text h5">{title}</p>
              <Stack direction="horizontal" gap={1}>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handlePublish(id, published)}
                >
                  {published === false ? 'Publish' : 'Unpublish'}
                </Button>
                <Link
                  to={`/offer/${id}/edit`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  )
}
