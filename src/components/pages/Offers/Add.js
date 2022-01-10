// Dependencies
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

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
import { get, post } from '../../../config/api'

// Components
import { SelectForm } from './common/SelectForm'
import { InputForm } from './common/InputForm'

// Helpers
import { sortListObjects } from '../../../helpers/utils'
import { parseDataOffer } from './helpers/parseDataOffer'
import { resetForm } from './helpers/resetForm'

export const AddOfferPage = () => {
  const { user } = useContext(AuthContext)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [skillsOptions, setSkillsOptions] = useState(null)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchSectors = async () => {
    get('/sectors', user.data.token)
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

  const fetchSkills = async () => {
    get('/skills', user.data.token)
      .then(({ data }) => {
        const skills = data.map((skill, i) => ({
          value: i + 1,
          label: skill.name,
          id: skill.id,
        }))
        sortListObjects(skills)
        setSkillsOptions(skills)
      })
      .catch((error) => {
        toast.error('Error try to fetching skills.')
        console.log(error)
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
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicDescription"
                      >
                        <Form.Label className="fw-bold">Description</Form.Label>
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
                      <SelectForm
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
                      <SelectForm
                        name="state"
                        label="State"
                        controlId="formBasicState"
                        control={control}
                        options={stateOptions}
                        errors={errors.state}
                        isMulti={false}
                      />
                    </Col>

                    <Col md={12} lg={3}>
                      {/* City */}
                      <SelectForm
                        name="city"
                        label="City"
                        controlId="formBasicCity"
                        control={control}
                        options={cityOptions}
                        errors={errors.city}
                        isMulti={false}
                      />
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
