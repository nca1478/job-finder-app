// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { get, put, del } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { DashboardItem } from '../../common/DashboardItem'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { Paginate } from '../../common/Paginate/Paginate'

export const DashboardPage = () => {
  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 6

  const initialFetchOffers = useCallback(async () => {
    await get(`/offers?page=1&limit=${limit}`, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPageCount(Math.ceil(response.data.count / limit))
          setOffers(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener ofertas de trabajo.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [user.data.token])

  const fetchOffers = async (page) => {
    await get(`/offers?page=${page}&limit=${limit}`, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setOffers(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener ofertas de trabajo.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    initialFetchOffers().catch(console.error)
  }, [initialFetchOffers])

  const handlePublish = (id, published) => {
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
        toast.error('Error al intentar publicar oferta de trabajo.')
        console.log(error)
      })
      .finally(() => {
        fetchOffers(currentPage)
      })
  }

  const handleDelete = (offerId) => {
    const confirm = window.confirm('¿Estás Seguro?')
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
          toast.error('Error al intentar eliminar la oferta de trabajo.')
          console.log(error)
        })
        .finally(() => {
          initialFetchOffers()
        })
    }
  }

  const handlePageClick = async (data) => {
    let page = data.selected + 1
    await fetchOffers(page)
    setCurrentPage(page)
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h3 className="text-center text-white">Ofertas de Trabajo</h3>
        <Row className="d-flex justify-content-center g-4 pt-2">
          {!loaded ? (
            <SpinnerBorder size="lg" variant="light" />
          ) : offers.length > 0 ? (
            <>
              {offers.map((offer) => (
                <DashboardItem
                  {...offer}
                  key={offer.id}
                  handlePublish={handlePublish}
                  handleDelete={handleDelete}
                />
              ))}

              <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <Alert variant="danger" className="w-75">
              Oh no.... No hay ofertas de trabajo para mostrar. Vuelve pronto...
            </Alert>
          )}
        </Row>
      </Container>
      <ToastContainer />
    </Col>
  )
}
