// Dependencies
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Stack, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Api Config
import { put, del } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

export const DashboardItem = (props) => {
  const { id, title, published, fetchOffers } = props
  const { user } = useContext(AuthContext)

  const handlePublish = () => {
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
        toast.error('Error try to fetching data.')
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
          toast.error('Error try to deleting data.')
          console.log(error)
        })
        .finally(() => {
          fetchOffers()
        })
    }
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
                  {published === false ? 'Publish' : 'Unpublish'}
                </Button>
                <Link
                  to={`/offer/edit/${id}`}
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
