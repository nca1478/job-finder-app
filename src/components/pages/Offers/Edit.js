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
import { get, put } from '../../../config/api'

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
  const [loaded, setLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm()

  useEffect(() => {
    fetchOffer(offerId)
    fetchSectors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchOffer = async (offerId) => {
    await get(`/offers/${offerId}`, user.data.token)
      .then((response) => {
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
        toast.error('Error updating offers.')
        console.log(error)
      })
  }

  return (
    <Container className="p-4" style={{ width: '650px' }}>
      <h2 className="text-center">Edit Offer</h2>
      <Row className="justify-content-center">
        {!loaded ? (
          <SpinnerBorder />
        ) : (
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
                <SelectFormEdit
                  name="country"
                  label="Country"
                  controlId="formBasicCountry"
                  control={control}
                  options={countryOptions}
                  errors={errors.country}
                  isMulti={false}
                />

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

                {/* Contract */}
                <SelectFormEdit
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

                  {/* Currency */}
                  <Col md={5}>
                    <SelectFormEdit
                      name="currency"
                      label="currency"
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
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Row>
      <ToastContainer />
    </Container>
  )
}
