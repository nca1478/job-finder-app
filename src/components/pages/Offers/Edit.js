// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

// Custom Dependencies
import { get, file, put } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { parseDataOffer } from './helpers/parseData'
import { setFormValues } from './helpers/setFormValues'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { Step1 } from './components/EditSteps/Step1'
import { Step2 } from './components/EditSteps/Step2'
import { Step3 } from './components/EditSteps/Step3'

export const EditOfferPage = () => {
  const { user } = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadedFile, setLoadedFile] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [page, setPage] = useState(0)
  const [formValuesEdit, setFormValuesEdit] = useState({})

  const { offerId } = useParams()
  const FormTitles = ['Info Básica', 'Habilidades y Precio', 'Localización']

  const fetchOffer = useCallback(
    async (offerId) => {
      await get(`/offers/${offerId}`, user.data.token)
        .then((response) => {
          setLoadedFile(response.data.img)
          setFormValuesEdit(setFormValues(response))
        })
        .catch((error) => {
          toast.error('Error al intentar obtener la oferta de trabajo.')
          console.log(error)
        })
        .finally(() => {
          setLoaded(true)
        })
    },
    [user.data.token]
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOffer(offerId)
  }, [fetchOffer, offerId])

  const uploadImage = async (id) => {
    const formData = new FormData()
    formData.append('img', selectedFile)
    setUploading(true)

    return new Promise(async function (resolve, reject) {
      await file('PUT', `/offers/${id}/upload`, formData, user.data.token)
        .then((response) => {
          if (response.data === null) {
            return reject(response.errors.msg)
          } else {
            return resolve(response.data.url)
          }
        })
        .catch((error) => {
          toast.error('Error subiendo imagen.')
          console.log(error)
        })
    })
  }

  const verifyFileUpload = async (data) => {
    return await uploadImage(data.id)
      .then((url) => {
        return url
      })
      .catch((err) => {
        toast.error(err)
        return false
      })
  }

  const handleSave = async (data) => {
    const urlImg = selectedFile ? await verifyFileUpload(data) : loadedFile
    const dataOffer = parseDataOffer({ ...data, img: urlImg })

    await put(`/offers/${offerId}/update`, dataOffer, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error al actualizar oferta de trabajo.')
        console.log(error)
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const handlePrev = () => {
    setPage((currPage) => currPage - 1)
  }

  const handleNext = () => {
    if (page === FormTitles.length - 1) {
    } else {
      setPage((currPage) => currPage + 1)
    }
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="py-2">
          {!loaded ? (
            <div className="text-center">
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="64vh" />
            </div>
          ) : (
            <Col md={{ span: 8, offset: 2 }}>
              <Card>
                <Card.Header as="h5" className="text-center">
                  <span>Editar Oferta de Trabajo - </span>{' '}
                  <span>{FormTitles[page]}</span>
                </Card.Header>
                <Card.Body>
                  {page === 0 && (
                    <Step1
                      page={page}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                      formValuesEdit={formValuesEdit}
                      setFormValuesEdit={setFormValuesEdit}
                    />
                  )}

                  {page === 1 && (
                    <Step2
                      page={page}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                      formValuesEdit={formValuesEdit}
                      setFormValuesEdit={setFormValuesEdit}
                    />
                  )}

                  {page === 2 && (
                    <Step3
                      page={page}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                      formValuesEdit={formValuesEdit}
                      setFormValuesEdit={setFormValuesEdit}
                      handleSave={handleSave}
                      loadedFile={loadedFile}
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                      uploading={uploading}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
