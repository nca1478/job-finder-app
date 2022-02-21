// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { get, post, put, del } from '../../../config/api'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SectorModal } from './components/SectorModal'
import { Paginate } from '../../common/Paginate/Paginate'
import { TableSectors } from './components/TableSectors'

export const SectorsPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [sectors, setSectors] = useState([])
  const [sector, setSector] = useState(null)
  const [showSectorModal, setShowSectorModal] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  const initialFetchSectors = useCallback(async () => {
    await get(`/sectors?page=1&limit=${limit}`)
      .then(({ data }) => {
        setPageCount(Math.ceil(data.count / limit))
        setSectors(data.rows)
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const fetchSectors = async (page) => {
    get(`/sectors?page=${page}&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPageCount(Math.ceil(response.data.count / limit))
          setSectors(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    initialFetchSectors().catch(console.error)
  }, [initialFetchSectors])

  const fetchSector = async (sectorId) => {
    await get(`/sectors/${sectorId}`)
      .then((response) => {
        setSector(response.data)
      })
      .catch((error) => {
        toast.error('Error try to fetching sector.')
        console.log(error)
      })
      .finally(() => {
        setShowSectorModal(true)
      })
  }

  const handleAdd = (data) => {
    post('/sectors', { name: data.name })
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error try to adding sector.')
        console.log(error)
      })
      .finally(() => {
        fetchSectors(currentPage)
        setShowSectorModal(false)
        setSector({})
      })
  }

  const handleUpdate = (data) => {
    put(`/sectors/${data.id}/update`, data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error try to updating sector.')
        console.log(error)
      })
      .finally(() => {
        fetchSectors(currentPage)
      })
  }

  const handleDelete = (sectorId) => {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      del(`/sectors/${sectorId}`)
        .then((response) => {
          if (response.data === null) {
            toast.error(response.errors.msg)
          } else {
            toast.info(response.data.msg)
          }
        })
        .catch((error) => {
          toast.error('Error try to deleting sector.')
          console.log(error)
        })
        .finally(() => {
          fetchSectors(currentPage)
        })
    }
  }

  const onSubmit = async (data) => {
    data.id ? handleUpdate(data) : handleAdd(data)
  }

  const handleEdit = (sectorId) => {
    fetchSector(sectorId)
  }

  const handleShowSectorModal = () => {
    setShowSectorModal(true)
  }

  const handleCloseSectorModal = () => {
    setShowSectorModal(false)
    setSector({})
  }

  const handlePageClick = async (data) => {
    let page = data.selected + 1
    await fetchSectors(page)
    setCurrentPage(page)
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="d-flex justify-content-center pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="64vh" />
            </>
          ) : (
            <Col md={{ span: 10 }}>
              <Card className="text-dark">
                <Card.Header
                  as="h5"
                  className="px-4 d-flex justify-content-between"
                >
                  <span>Sectors</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-end"
                    onClick={handleShowSectorModal}
                  >
                    Add New
                  </Button>
                </Card.Header>
                <Card.Body className="px-4 pt-4 pb-1">
                  <TableSectors
                    sectors={sectors}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />

                  <Paginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                  />
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        {/* Modal */}
        <SectorModal
          show={showSectorModal}
          onSubmit={onSubmit}
          handleClose={handleCloseSectorModal}
          sector={sector}
        />

        <ToastContainer />
      </Container>
    </Col>
  )
}
