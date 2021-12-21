// Dependencies
import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

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

// Components
import { InputForm } from './common/InputForm'

// Context
import { AuthContext } from '../../../auth/authContext'

// Api
import { get, put } from '../../../config/api'

// Helpers
import {
  getCountrySelect,
  getStateSelect,
  getCitySelect,
  getSectorsSelect,
  getExperienceSelect,
  getContractSelect,
  getPeriodSelect,
  getCurrencySelect,
} from '../../../helpers/getSelectOption'
import { sortListObjects } from '../../../helpers/utils'

export const EditOfferPage = () => {
  const { offerId } = useParams()
  const { user } = useContext(AuthContext)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm()

  useEffect(() => {
    fetchOffer(offerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchSectors = async () => {
    await get('/sectors', user.data.token).then(({ data }) => {
      const sectors = data.map((sector, i) => ({
        value: i + 1,
        label: sector.name,
        id: sector.id,
      }))
      sortListObjects(sectors)
      setSectorOptions(sectors)
    })
  }

  const fetchOffer = async (offerId) => {
    await get(`/offers/${offerId}`, user.data.token)
      .then((response) => {
        reset(response.data)
        fetchSectors()
      })
      .catch((error) => {
        toast.error('Error fetching data.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const parseDataOffer = (data) => {
    return {
      ...data,
      country: data.country.label ? data.country.label : data.country,
      state: data.state.label ? data.state.label : data.state,
      city: data.city.label ? data.city.label : data.city,
      experience: data.experience.label
        ? data.experience.label
        : data.experience,
      contract: data.contract.label ? data.contract.label : data.contract,
      period: data.period.label ? data.period.label : data.period,
      currency: data.currency.label ? data.currency.label : data.currency,
      sectors: data.sectors.map((sector) => ({ id: sector.id })),
    }
  }

  const onSubmit = async (data) => {
    const dataOffer = parseDataOffer(data)
    await put(`/offers/${offerId}/update`, dataOffer, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error updating job offers. Try again.')
        console.log(error)
      })
  }

  return (
    <Container className="p-4" style={{ width: '650px' }}>
      <Row>
        <Col>
          <h2 className="text-center">Edit Offer</h2>
          <Card className="py-3">
            <Card.Body>
              <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <InputForm
                  name="title"
                  label="Title"
                  placeholder="Enter Title"
                  controlId="formBasicTitle"
                  register={register}
                  errors={errors.title}
                />

                {/* Description */}
                <InputForm
                  name="description"
                  label="Description"
                  placeholder="Enter Description"
                  controlId="formBasicDescription"
                  register={register}
                  errors={errors.description}
                />

                {/* Country */}
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                        <Select
                          value={getCountrySelect(value)}
                          onChange={({ value, label }) =>
                            onChange({ value, label })
                          }
                          options={countryOptions}
                        />
                        {errors.country && (
                          <Form.Text className="text-danger w-100">
                            Country is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller>

                {/* State */}
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Select
                          value={getStateSelect(value)}
                          onChange={({ value, label }) =>
                            onChange({ value, label })
                          }
                          options={stateOptions}
                        />
                        {errors.state && (
                          <Form.Text className="text-danger w-100">
                            State is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller>

                {/* City */}
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Select
                          value={getCitySelect(value)}
                          onChange={({ value, label }) =>
                            onChange({ value, label })
                          }
                          options={cityOptions}
                        />
                        {errors.city && (
                          <Form.Text className="text-danger w-100">
                            City is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller>

                {/* Sectors */}
                {/* <Controller
                  name="sectors"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group className="mb-3" controlId="formBasicSectors">
                        <Form.Label>Sectors</Form.Label>
                        <Select
                          value={getSectorsSelect(
                            loaded ? getValues('sectors') : []
                          )}
                          options={sectorOptions}
                          isMulti
                        />
                        {errors.sectors && (
                          <Form.Text className="text-danger w-100">
                            Sectors is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller> */}

                {/* Experience */}
                <Controller
                  name="experience"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicExperience"
                      >
                        <Form.Label>Experience</Form.Label>
                        <Select
                          value={getExperienceSelect(value)}
                          onChange={({ value, label }) =>
                            onChange({ value, label })
                          }
                          options={experienceOptions}
                        />
                        {errors.experience && (
                          <Form.Text className="text-danger w-100">
                            Experience is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller>

                {/* Contract */}
                <Controller
                  name="contract"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicContract"
                      >
                        <Form.Label>Contract</Form.Label>
                        <Select
                          value={getContractSelect(value)}
                          onChange={({ value, label }) =>
                            onChange({ value, label })
                          }
                          options={contractOptions}
                        />
                        {errors.contract && (
                          <Form.Text className="text-danger w-100">
                            Contract is Required
                          </Form.Text>
                        )}
                      </Form.Group>
                    )
                  }}
                ></Controller>

                <Row>
                  {/* Payment */}
                  <Col md={3}>
                    <InputForm
                      name="payment"
                      label="Payment"
                      placeholder="Enter Payment"
                      controlId="formBasicPayment"
                      register={register}
                      errors={errors.payment}
                    />
                  </Col>

                  {/* Period */}
                  <Col md={4}>
                    <Controller
                      name="period"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPeriod"
                          >
                            <Form.Label>Period</Form.Label>
                            <Select
                              value={getPeriodSelect(value)}
                              onChange={({ value, label }) =>
                                onChange({ value, label })
                              }
                              options={periodOptions}
                            />
                            {errors.period && (
                              <Form.Text className="text-danger w-100">
                                Period is Required
                              </Form.Text>
                            )}
                          </Form.Group>
                        )
                      }}
                    ></Controller>
                  </Col>

                  {/* Currency */}
                  <Col md={5}>
                    <Controller
                      name="currency"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCurrency"
                          >
                            <Form.Label>Currency</Form.Label>
                            <Select
                              value={getCurrencySelect(value)}
                              onChange={({ value, label }) =>
                                onChange({ value, label })
                              }
                              options={currencyOptions}
                            />
                            {errors.currency && (
                              <Form.Text className="text-danger w-100">
                                Currency is Required
                              </Form.Text>
                            )}
                          </Form.Group>
                        )
                      }}
                    ></Controller>
                  </Col>
                </Row>

                {/* Save Button */}
                <Button type="submit" variant="primary" className="w-100">
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}
