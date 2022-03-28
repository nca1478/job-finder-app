// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

// Custom Dependencies
import {
  get,
  put,
  file,
  getCountries,
  getCurrencies,
} from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { setFormValues } from './helpers/setFormValues'
import { sortListByLabel, sortListObjects } from '../../../helpers/utils'
import { InputForm } from './components/InputForm'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SelectFormEdit } from './components/SelectFormEdit'
import { ImageModal } from './components/ImageModal'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import {
  parseData,
  parseDataCountries,
  parseDataCurrencies,
  parseDataOffer,
} from './helpers/parseData'

export const EditOfferPage = () => {
  const [sectorOptions, setSectorOptions] = useState(null)
  const [skillOptions, setSkillOptions] = useState(null)
  const [countryOptions, setCountryOptions] = useState(null)
  const [currencyOptions, setCurrencyOptions] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadedFile, setLoadedFile] = useState(null)
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { offerId } = useParams()
  const { user } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm()

  const fetchOffer = useCallback(
    async (offerId) => {
      await get(`/offers/${offerId}`, user.data.token)
        .then((response) => {
          setLoadedFile(response.data.img)
          reset(setFormValues(response))
        })
        .catch((error) => {
          toast.error('Error try to fetching job offer.')
          console.log(error)
        })
        .finally(() => {
          setLoaded(true)
        })
    },
    [reset, user.data.token]
  )

  const fetchSectors = useCallback(async () => {
    await get('/sectors?page=1&limit=1000')
      .then(({ data }) => {
        const sectors = parseData(data.rows)
        sortListObjects(sectors)
        setSectorOptions(sectors)
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
  }, [])

  const fetchSkills = useCallback(async () => {
    await get('/skills?page=1&limit=1000')
      .then(({ data }) => {
        const skills = parseData(data.rows)
        sortListObjects(skills)
        setSkillOptions(skills)
      })
      .catch((error) => {
        toast.error('Error try to fetching skills.')
        console.log(error)
      })
  }, [])

  const fetchCountries = useCallback(async () => {
    getCountries('https://api.countrystatecity.in/v1/countries').then(
      (data) => {
        const countries = parseDataCountries(data)
        sortListByLabel(countries)
        setCountryOptions(countries)
      }
    )
  }, [])

  const fetchCurrencies = useCallback(async () => {
    getCurrencies('https://api.coinbase.com/v2/currencies').then((data) => {
      const currencies = parseDataCurrencies(data.data)
      sortListByLabel(currencies)
      setCurrencyOptions(currencies)
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOffer(offerId)
    fetchSectors()
    fetchSkills()
    fetchCountries()
    fetchCurrencies()
  }, [
    fetchOffer,
    offerId,
    fetchSectors,
    fetchSkills,
    fetchCountries,
    fetchCurrencies,
  ])

  const fileChangedHandler = (e) => {
    e && setSelectedFile(e.target.files[0])
  }

  const handleShow = () => setShow(true)

  const handleClose = () => setShow(false)

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
          toast.error('Error uploading image.')
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

  const onSubmit = async (data) => {
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
        toast.error('Error updating offers.')
        console.log(error)
      })
      .finally(() => {
        setUploading(false)
      })
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
            <Col>
              <Card>
                <Card.Header as="h5" className="text-center">
                  Edit Job Offer
                </Card.Header>
                <Card.Body>
                  <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={12} lg={6}>
                        {/* Title */}
                        <InputForm
                          type="text"
                          name="title"
                          label="Title"
                          placeholder="Enter Title"
                          controlId="formBasicTitle"
                          register={register}
                          errors={errors.title}
                        />
                      </Col>
                      <Col md={12} lg={6}>
                        {/* Sectors */}
                        <SelectFormEdit
                          name="sectors"
                          label="Sectors"
                          controlId="formBasicSectors"
                          control={control}
                          options={sectorOptions}
                          errors={errors.sectors}
                          isMulti={true}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {/* Description */}
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCvText"
                        >
                          <Form.Label className="fw-bold">
                            Description
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Text"
                            {...register('description')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} lg={6}>
                        {/* Skills */}
                        <SelectFormEdit
                          name="skills"
                          label="Skills"
                          controlId="formBasicSkills"
                          control={control}
                          options={skillOptions}
                          errors={errors.skills}
                          isMulti={true}
                        />
                      </Col>

                      <Col md={12} lg={3}>
                        {/* Price */}
                        <InputForm
                          type="number"
                          name="price"
                          label="Price"
                          placeholder="Enter Price"
                          controlId="formBasicPrice"
                          register={register}
                          errors={errors.price}
                        />
                      </Col>

                      <Col md={12} lg={3}>
                        {/* Currency */}
                        <SelectFormEdit
                          name="currency"
                          label="Currency"
                          controlId="formBasicCurrency"
                          control={control}
                          options={currencyOptions}
                          errors={errors.currency}
                          isMulti={false}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} lg={6}>
                        {/* Country */}
                        <SelectFormEdit
                          name="country"
                          label="Country"
                          controlId="formBasicCountry"
                          control={control}
                          options={countryOptions}
                          errors={errors.country}
                          isMulti={false}
                        />
                      </Col>

                      <Col md={12} lg={3}>
                        {/* State */}
                        <InputForm
                          type="text"
                          name="state"
                          label="State"
                          placeholder="Enter State"
                          controlId="formBasicState"
                          register={register}
                          errors={errors.state}
                        />
                      </Col>

                      <Col md={12} lg={3}>
                        {/* City */}
                        <InputForm
                          type="text"
                          name="city"
                          label="City"
                          placeholder="Enter City"
                          controlId="formBasicCity"
                          register={register}
                          errors={errors.city}
                        />
                      </Col>
                    </Row>

                    {/* Image */}
                    <Row>
                      <Col md={12} lg={loadedFile ? 8 : 12}>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label className="fw-bold">
                            Upload Image
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            {...register('img')}
                            onChange={fileChangedHandler}
                          />
                        </Form.Group>
                      </Col>

                      {loadedFile && (
                        <Col md={12} lg={4}>
                          <Form.Group controlId="formShowImg" className="mb-3">
                            <Form.Label className="fw-bold">
                              Show Image
                            </Form.Label>
                            <Button
                              variant="primary"
                              className="w-100"
                              onClick={handleShow}
                            >
                              Show
                            </Button>
                          </Form.Group>
                        </Col>
                      )}
                    </Row>

                    {/* Modal */}
                    <ImageModal
                      show={show}
                      handleClose={handleClose}
                      offer={{
                        title: getValues('title'),
                        img: getValues('img'),
                      }}
                    />

                    {/* Save Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 mb-2"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <SpinnerBorder size="sm" variant="light" />
                      ) : (
                        'Save'
                      )}
                    </Button>
                  </Form>
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
