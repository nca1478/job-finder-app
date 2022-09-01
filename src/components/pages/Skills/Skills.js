// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { get, post, put, del } from '../../../config/api'
import { SkillModal } from './components/SkillModal'
import { Paginate } from '../../common/Paginate/Paginate'
import { TableSkills } from './components/TableSkills'

export const SkillsPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState(null)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5

  const initialFetchSkills = useCallback(async () => {
    await get(`/skills?page=1&limit=${limit}`)
      .then(({ data }) => {
        setPageCount(Math.ceil(data.count / limit))
        setSkills(data.rows)
      })
      .catch((error) => {
        toast.error('Error al intentar obtener habilidades.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  const fetchSkills = async (page) => {
    await get(`/skills?page=${page}&limit=${limit}`)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          setPageCount(Math.ceil(response.data.count / limit))
          setSkills(response.data.rows)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar obtener habilidades.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    initialFetchSkills().catch(console.error)
  }, [initialFetchSkills])

  const fetchSkill = async (skillId) => {
    await get(`/skills/${skillId}`)
      .then((response) => {
        setSkill(response.data)
      })
      .catch((error) => {
        toast.error('Error al intentar obtener la habilidad.')
        console.log(error)
      })
      .finally(() => {
        setShowSkillModal(true)
      })
  }

  const handleAdd = (data) => {
    post('/skills', { name: data.name })
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar agregar habilidad.')
        console.log(error)
      })
      .finally(() => {
        fetchSkills(currentPage)
        setShowSkillModal(false)
        setSkill({})
      })
  }

  const handleUpdate = (data) => {
    put(`/skills/${data.id}/update`, data)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error al intentar actualizar la habilidad.')
        console.log(error)
      })
      .finally(() => {
        fetchSkills(currentPage)
      })
  }

  const handleDelete = (skillId) => {
    const confirm = window.confirm('¿Estás Seguro?')
    if (confirm) {
      del(`/skills/${skillId}`)
        .then((response) => {
          if (response.data === null) {
            toast.error(response.errors.msg)
          } else {
            toast.info(response.data.msg)
          }
        })
        .catch((error) => {
          toast.error('Error al intentar eliminar la habilidad.')
          console.log(error)
        })
        .finally(() => {
          fetchSkills(currentPage)
        })
    }
  }

  const onSubmit = async (data) => {
    data.id ? handleUpdate(data) : handleAdd(data)
  }

  const handleEdit = (skillId) => {
    fetchSkill(skillId)
  }

  const handleShowSkillModal = () => {
    setShowSkillModal(true)
  }

  const handleCloseSkillModal = () => {
    setShowSkillModal(false)
    setSkill(null)
  }

  const handlePageClick = async (data) => {
    let page = data.selected + 1
    await fetchSkills(page)
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
                  <span>Habilidades</span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-end"
                    onClick={handleShowSkillModal}
                  >
                    Agregar Nueva
                  </Button>
                </Card.Header>
                <Card.Body className="px-4 pt-4 pb-1">
                  <TableSkills
                    skills={skills}
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
        <SkillModal
          show={showSkillModal}
          onSubmit={onSubmit}
          handleClose={handleCloseSkillModal}
          skill={skill}
        />

        <ToastContainer />
      </Container>
    </Col>
  )
}
