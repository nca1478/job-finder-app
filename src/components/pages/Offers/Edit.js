// Dependencies
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

// Selects Options
import {
  cityOptions,
  contractOptions,
  countryOptions,
  currencyOptions,
  experienceOptions,
  periodOptions,
  stateOptions,
} from '../../../data/selectOptions'

// Context
import { AuthContext } from '../../../auth/authContext'

// Fetch Config
import { get, put, file } from '../../../config/api'

// Helpers
import { parseDataOffer } from './helpers/parseDataOffer'
import { setFormValues } from './helpers/setFormValues'
import { sortListObjects } from '../../../helpers/utils'

// Components
import { InputForm } from './common/InputForm'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SelectFormEdit } from './common/SelectFormEdit'

export const EditOfferPage = () => {
  const { offerId } = useParams()
  const { user } = useContext(AuthContext)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadedFile, setLoadedFile] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchOffer(offerId)
    fetchSectors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchOffer = async (offerId) => {
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
  }

  const fetchSectors = async () => {
    await get('/sectors', user.data.token)
      .then(({ data }) => {
        const sectors = data.map((sector, i) => ({
          value: i + 1,
          label: sector.name,
          id: sector.id,
        }))
        sortListObjects(sectors)
        setSectorOptions(sectors)
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
  }

  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const uploadImage = async (id) => {
    const formData = new FormData()
    formData.append('img', selectedFile)

    return new Promise(async function (resolve, reject) {
      await file('PUT', `/offers/${id}/upload`, formData, user.data.token)
        .then((response) => {
          if (response.data === null) {
            reject(response.errors.msg)
          } else {
            resolve(response.data.url)
          }
        })
        .catch((error) => {
          toast.error('Error uploading image.')
          console.log(error)
        })
    })
  }

  const onSubmit = async (data) => {
    await uploadImage(data.id).then(async (url) => {
      const dataOffer = parseDataOffer({ ...data, img: url })

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
    })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">Edit Offer</h2>
        <Row className="justify-content-center pt-2">
          <Col>
            {!loaded ? (
              <SpinnerBorder />
            ) : (
              <Card className="py-3">
                <Card.Body>
                  <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={12} lg={6}>
                        {/* Title */}
                        <InputForm
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
                      <Col md={12} lg={6}>
                        {/* State */}
                        <SelectFormEdit
                          name="state"
                          label="State"
                          controlId="formBasicState"
                          control={control}
                          options={stateOptions}
                          errors={errors.state}
                          isMulti={false}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12} lg={6}>
                        {/* City */}
                        <SelectFormEdit
                          name="city"
                          label="City"
                          controlId="formBasicCity"
                          control={control}
                          options={cityOptions}
                          errors={errors.city}
                          isMulti={false}
                        />
                      </Col>
                      <Col md={12} lg={6}>
                        {/* Experience */}
                        <SelectFormEdit
                          name="experience"
                          label="Experience"
                          controlId="formBasicExperience"
                          control={control}
                          options={experienceOptions}
                          errors={errors.experience}
                          isMulti={false}
                        />
                      </Col>
                    </Row>

                    <Row>
                      {/* Contract */}
                      <Col md={12} lg={4}>
                        <SelectFormEdit
                          name="contract"
                          label="Contract"
                          controlId="formBasicContract"
                          control={control}
                          options={contractOptions}
                          errors={errors.contract}
                          isMulti={false}
                        />
                      </Col>

                      {/* Payment */}
                      <Col md={12} lg={2}>
                        <InputForm
                          name="payment"
                          label="Payment"
                          placeholder="Enter Payment"
                          controlId="formBasicPayment"
                          register={register}
                          errors={errors.payment}
                        />
                      </Col>

                      {/* Currency */}
                      <Col md={12} lg={3}>
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

                      {/* Period */}
                      <Col md={12} lg={3}>
                        <SelectFormEdit
                          name="period"
                          label="Period"
                          controlId="formBasicPeriod"
                          control={control}
                          options={periodOptions}
                          errors={errors.period}
                          isMulti={false}
                        />
                      </Col>
                    </Row>

                    {/* Image */}
                    <Row>
                      <Col md={12} lg={loadedFile ? 8 : 12}>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label className="fw-bold">Image</Form.Label>
                          <Form.Control
                            type="file"
                            {...register('img')}
                            onChange={fileChangedHandler}
                          />
                        </Form.Group>
                      </Col>

                      {loadedFile && (
                        <Col md={12} lg={4}>
                          <Form.Group controlId="formViewImg" className="mb-3">
                            <Form.Label className="fw-bold">
                              View Image
                            </Form.Label>
                            <Button variant="primary" className="w-100">
                              View
                            </Button>
                          </Form.Group>
                        </Col>
                      )}
                    </Row>

                    {/* Save Button */}
                    <Button type="submit" variant="primary" className="w-100">
                      Save
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
