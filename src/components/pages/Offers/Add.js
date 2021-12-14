// Dependencies
import { useEffect, useState, useContext, useRef } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
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

// Context
import { AuthContext } from '../../../auth/authContext'

// Api Config
import { get, post } from '../../../config/api'

// Helpers
import { sortListObjects } from '../../../helpers/utils'

export const AddOfferPage = () => {
  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // Context
  const { user } = useContext(AuthContext)

  // Selects State
  const [countrySelect, setCountrySelect] = useState(null)
  const [stateSelect, setStateSelect] = useState(null)
  const [citySelect, setCitySelect] = useState(null)
  const [sectorSelect, setSectorSelect] = useState(null)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [experienceSelect, setExperienceSelect] = useState(null)
  const [contractSelect, setContractSelect] = useState(null)
  const [periodSelect, setPeriodSelect] = useState(null)
  const [currencySelect, setCurrencySelect] = useState(null)

  useEffect(() => {
    fetchSectors()
  }, [])

  const fetchSectors = async () => {
    get('/sectors', user.data.token).then(({ data }) => {
      const sectors = data.map((sector, i) => ({
        value: i + 1,
        label: sector.name,
        id: sector.id,
      }))
      sortListObjects(sectors)
      setSectorOptions(sectors)
    })
  }

  const parseDataOffer = (data) => {
    return {
      ...data,
      country: countrySelect.label,
      state: stateSelect.label,
      city: citySelect.label,
      experience: experienceSelect.label,
      contract: contractSelect.label,
      period: periodSelect.label,
      currency: currencySelect.label,
      sectors: sectorSelect.map((sector) => ({ id: sector.id })),
    }
  }

  const resetForm = () => {
    reset()
    setCountrySelect(null)
    setStateSelect(null)
    setCitySelect(null)
    setSectorSelect(null)
    setExperienceSelect(null)
    setContractSelect(null)
    setPeriodSelect(null)
    setCurrencySelect(null)
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
        toast.error('Error adding job offers. Try again.')
        console.log(error)
      })
      .finally(() => {
        resetForm()
      })
  }

  const handleCountryChange = ({ value, label }) => {
    setCountrySelect({ value, label })
  }

  const handleStateChange = ({ value, label }) => {
    setStateSelect({ value, label })
  }

  const handleCityChange = ({ value, label }) => {
    setCitySelect({ value, label })
  }

  const handleSectorChange = (values) => {
    setSectorSelect([...values])
  }

  const handleExperienceChange = ({ value, label }) => {
    setExperienceSelect({ value, label })
  }

  const handleContractChange = ({ value, label }) => {
    setContractSelect({ value, label })
  }

  const handlePeriodChange = ({ value, label }) => {
    setPeriodSelect({ value, label })
  }

  const handleCurrencyChange = ({ value, label }) => {
    setCurrencySelect({ value, label })
  }

  return (
    <Container className="p-4" style={{ width: '650px' }}>
      <Row>
        <Col>
          <h2 className="text-center">Add New Offer</h2>
          <Card className="py-3">
            <Card.Body>
              <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    {...register('title', { required: true })}
                  />
                  {errors.title && (
                    <Form.Text className="text-danger w-100">
                      Title is required
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    {...register('description', { required: true })}
                  />
                  {errors.description && (
                    <Form.Text className="text-danger w-100">
                      Description is required
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Country */}
                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Country</Form.Label>
                  <Select
                    className="mb-2"
                    value={countrySelect}
                    options={countryOptions}
                    onChange={handleCountryChange}
                  />
                </Form.Group>

                {/* State */}
                <Form.Group className="mb-3" controlId="formBasicState">
                  <Form.Label>State</Form.Label>
                  <Select
                    className="mb-2"
                    value={stateSelect}
                    options={stateOptions}
                    onChange={handleStateChange}
                  />
                </Form.Group>

                {/* City */}
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Select
                    className="mb-2"
                    value={citySelect}
                    options={cityOptions}
                    onChange={handleCityChange}
                  />
                </Form.Group>

                {/* Sector */}
                <Form.Group className="mb-3" controlId="formBasicSector">
                  <Form.Label>Sector</Form.Label>
                  <Select
                    className="mb-2"
                    value={sectorSelect}
                    options={sectorOptions}
                    onChange={handleSectorChange}
                    isMulti
                  />
                </Form.Group>

                {/* Experience */}
                <Form.Group className="mb-3" controlId="formBasicExperience">
                  <Form.Label>Experience</Form.Label>
                  <Select
                    className="mb-2"
                    value={experienceSelect}
                    options={experienceOptions}
                    onChange={handleExperienceChange}
                  />
                </Form.Group>

                {/* Contract */}
                <Form.Group className="mb-3" controlId="formBasicContract">
                  <Form.Label>Contract</Form.Label>
                  <Select
                    className="mb-2"
                    value={contractSelect}
                    options={contractOptions}
                    onChange={handleContractChange}
                  />
                </Form.Group>

                <Row>
                  {/* Salary */}
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicSalary">
                      <Form.Label>Payment</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Payment"
                        {...register('payment')}
                      />
                    </Form.Group>
                  </Col>

                  {/* Period */}
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formBasicPeriod">
                      <Form.Label>Period</Form.Label>
                      <Select
                        className="mb-2"
                        value={periodSelect}
                        options={periodOptions}
                        onChange={handlePeriodChange}
                      />
                    </Form.Group>
                  </Col>

                  {/* Currency */}
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicCurrency">
                      <Form.Label>Currency</Form.Label>
                      <Select
                        className="mb-2"
                        value={currencySelect}
                        options={currencyOptions}
                        onChange={handleCurrencyChange}
                      />
                    </Form.Group>
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
  )
}
