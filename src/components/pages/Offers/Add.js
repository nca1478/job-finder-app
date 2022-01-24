// Dependencies
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

// Custom Dependencies
import {
  // cityOptions,
  contractOptions,
  // countryOptions,
  // stateOptions,
  currencyOptions,
  experienceOptions,
  periodOptions,
} from '../../../data/selectOptions'
import { AuthContext } from '../../../auth/authContext'
import { get, post } from '../../../config/api'
import { SelectForm } from './common/SelectForm'
import { InputForm } from './common/InputForm'
import { sortListObjects } from '../../../helpers/utils'
import { parseDataOffer } from './helpers/parseDataOffer'
import { resetForm } from './helpers/resetForm'
import { fetchCountries } from '../../../helpers/fetchCountries'
import { parseDataSelect } from './helpers/parseDataSelect'
import { TextareaForm } from './common/TextareaForm'
import { fetchStates } from '../../../helpers/fetchStates'
import { fetchCities } from '../../../helpers/fetchCities'

export const AddOfferPage = () => {
  const { user } = useContext(AuthContext)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [skillsOptions, setSkillsOptions] = useState(null)
  const [countryOptions, setCountryOptions] = useState(null)
  const [stateOptions, setStateOptions] = useState(null)
  const [cityOptions, setCityOptions] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm()

  useEffect(() => {
    fetchSectors()
    fetchSkills()
    getCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchSectors = async () => {
    get('/sectors', user.data.token)
      .then(({ data }) => {
        const sectors = parseDataSelect(data)
        sortListObjects(sectors)
        setSectorOptions(sectors)
      })
      .catch((error) => {
        toast.error('Error try to fetching sectors.')
        console.log(error)
      })
  }

  const fetchSkills = async () => {
    get('/skills', user.data.token)
      .then(({ data }) => {
        const skills = parseDataSelect(data)
        sortListObjects(skills)
        setSkillsOptions(skills)
      })
      .catch((error) => {
        toast.error('Error try to fetching skills.')
        console.log(error)
      })
  }

  const getCountries = async () => {
    const data = await fetchCountries()
    const countries = data.map((item, i) => ({
      id: item.id,
      value: i + 1,
      label: item.name,
      ciso: item.iso2,
    }))
    setCountryOptions(countries)
  }

  const getStates = async (ciso) => {
    await fetchStates(ciso).then((data) => {
      const states = data.map((item, i) => ({
        id: item.id,
        value: i + 1,
        label: item.name,
        siso: item.iso2,
        ciso,
      }))
      setStateOptions(states)
    })
  }

  const getCities = async (ciso, siso) => {
    await fetchCities(ciso, siso).then((data) => {
      const cities = data.map((item, i) => ({
        id: item.id,
        value: i + 1,
        label: item.name,
      }))
      setCityOptions(cities)
    })
  }

  const onSubmit = async (data) => {
    const dataOffer = parseDataOffer(data)
    post('/offers', dataOffer, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error try to adding job offers.')
        console.log(error)
      })
      .finally(() => {
        resetForm(reset, setValue)
      })
  }

  const onChangeSelectCountry = (e) => {
    getStates(e.ciso)
  }

  const onChangeSelectState = (e) => {
    getCities(e.ciso, e.siso)
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">Add New Offer</h2>
        <Row className="justify-content-center pt-2">
          <Col>
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
                      <SelectForm
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
                      <TextareaForm
                        name="description"
                        label="Description"
                        placeholder="Enter Description"
                        controlId="formBasicDescription"
                        register={register}
                        errors={errors.description}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} lg={6}>
                      {/* Skills */}
                      <SelectForm
                        name="skills"
                        label="Skills"
                        controlId="formBasicSkills"
                        control={control}
                        options={skillsOptions}
                        errors={errors.sectors}
                        isMulti={true}
                      />
                    </Col>
                    <Col md={12} lg={6}>
                      {/* Experience */}
                      <SelectForm
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
                    <Col md={12} lg={4}>
                      {/* Contract */}
                      <SelectForm
                        name="contract"
                        label="Contract"
                        controlId="formBasicContract"
                        control={control}
                        options={contractOptions}
                        errors={errors.contract}
                        isMulti={false}
                      />
                    </Col>
                    <Col md={12} lg={2}>
                      {/* Period */}
                      <SelectForm
                        name="period"
                        label="Period"
                        controlId="formBasicPeriod"
                        control={control}
                        options={periodOptions}
                        errors={errors.period}
                        isMulti={false}
                      />
                    </Col>
                    <Col md={12} lg={3}>
                      {/* Payment */}
                      <InputForm
                        name="payment"
                        label="Payment"
                        placeholder="Enter Payment"
                        controlId="formBasicPayment"
                        register={register}
                        errors={errors.payment}
                      />
                    </Col>
                    <Col md={12} lg={3}>
                      {/* Currency */}
                      <SelectForm
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
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCountry"
                          >
                            <Form.Label className="fw-bold">Country</Form.Label>
                            <Select
                              {...field}
                              options={countryOptions}
                              onChange={onChangeSelectCountry}
                              isClearable
                              isMulti={false}
                            />
                            {errors.country && (
                              <Form.Text className="text-danger w-100">
                                Required
                              </Form.Text>
                            )}
                          </Form.Group>
                        )}
                      ></Controller>
                    </Col>

                    <Col md={12} lg={3}>
                      {/* State */}
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicState"
                          >
                            <Form.Label className="fw-bold">State</Form.Label>
                            <Select
                              {...field}
                              options={stateOptions}
                              onChange={onChangeSelectState}
                              isClearable
                              isMulti={false}
                            />
                            {errors.state && (
                              <Form.Text className="text-danger w-100">
                                Required
                              </Form.Text>
                            )}
                          </Form.Group>
                        )}
                      ></Controller>
                    </Col>

                    <Col md={12} lg={3}>
                      {/* City */}
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCity"
                          >
                            <Form.Label className="fw-bold">City</Form.Label>
                            <Select
                              {...field}
                              options={cityOptions}
                              isClearable
                              isMulti={false}
                            />
                            {errors.city && (
                              <Form.Text className="text-danger w-100">
                                Required
                              </Form.Text>
                            )}
                          </Form.Group>
                        )}
                      ></Controller>
                    </Col>
                  </Row>

                  {/* Save Button */}
                  <Button type="submit" variant="primary" className="w-100">
                    Save Job Offer
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
