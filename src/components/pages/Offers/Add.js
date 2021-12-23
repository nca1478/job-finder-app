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

// Api Config
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
    <Container className="p-4" style={{ width: '650px' }}>
      <Row>
        <Col>
          <h2 className="text-center">Add New Offer</h2>
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
                <SelectForm
                  name="country"
                  label="Country"
                  controlId="formBasicCountry"
                  control={control}
                  options={countryOptions}
                  errors={errors.country}
                  isMulti={false}
                />

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

                {/* Sector */}
                <SelectForm
                  name="sectors"
                  label="Sectors"
                  controlId="formBasicSectors"
                  control={control}
                  options={sectorOptions}
                  errors={errors.sectors}
                  isMulti={true}
                />

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

                  {/* Currency */}
                  <Col md={5}>
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
