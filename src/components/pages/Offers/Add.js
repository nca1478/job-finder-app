// Dependencies
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// Custom Dependencies
import { currencyOptions } from '../../../data/selectOptions'
import { AuthContext } from '../../../auth/authContext'
import { get, getTp, post } from '../../../config/api'
import { SelectForm } from './common/SelectForm'
import { InputForm } from './common/InputForm'
import { sortListByLabel, sortListObjects } from '../../../helpers/utils'
import { resetForm } from './helpers/resetForm'
import { TextareaForm } from './common/TextareaForm'
import {
  parseData,
  parseDataCountries,
  parseDataOffer,
} from './helpers/parseData'

export const AddOfferPage = () => {
  const { user } = useContext(AuthContext)
  const [sectorOptions, setSectorOptions] = useState(null)
  const [skillsOptions, setSkillsOptions] = useState(null)
  const [countryOptions, setCountryOptions] = useState(null)
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
    fetchCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchSectors = async () => {
    get('/sectors', user.data.token)
      .then(({ data }) => {
        const sectors = parseData(data)
        sortListByLabel(sectors)
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
        const skills = parseData(data)
        sortListObjects(skills)
        setSkillsOptions(skills)
      })
      .catch((error) => {
        toast.error('Error try to fetching skills.')
        console.log(error)
      })
  }

  const fetchCountries = async () => {
    getTp('https://api.countrystatecity.in/v1/countries').then((data) => {
      const countries = parseDataCountries(data)
      sortListByLabel(countries)
      setCountryOptions(countries)
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
    </Col>
  )
}
