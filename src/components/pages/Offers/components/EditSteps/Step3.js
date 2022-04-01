// Dependencies
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

// Custom Dependencies
import { getCountries } from '../../../../../config/api'
import { sortListByLabel } from '../../../../../helpers/utils'
import { SpinnerBorder } from '../../../../common/Spinners/SpinnerBorder'
import { parseDataCountries } from '../../helpers/parseData'
import { ImageModal } from '../ImageModal'
import { InputForm } from '../InputForm'
import { SelectFormEdit } from '../SelectFormEdit'

export const Step3 = ({
  page,
  handlePrev,
  formValuesEdit,
  setFormValuesEdit,
  handleSave,
  loadedFile,
  setSelectedFile,
  uploading,
}) => {
  const [show, setShow] = useState(false)
  const [countryOptions, setCountryOptions] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm()

  const fetchCountries = useCallback(async () => {
    getCountries('https://api.countrystatecity.in/v1/countries').then(
      (data) => {
        const countries = parseDataCountries(data)
        sortListByLabel(countries)
        setCountryOptions(countries)
      }
    )
  }, [])

  useEffect(() => {
    fetchCountries()
    reset(formValuesEdit)
  }, [fetchCountries, reset, formValuesEdit])

  const fileChangedHandler = (e) => {
    e && setSelectedFile(e.target.files[0])
  }

  const handleShow = () => setShow(true)

  const handleClose = () => setShow(false)

  const onSubmit = (data) => {
    if (data) {
      setFormValuesEdit({ ...formValuesEdit, ...data })
      handleSave(data)
    }
  }

  return (
    <>
      <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
        <SelectFormEdit
          name="country"
          label="Country"
          controlId="formBasicCountry"
          control={control}
          options={countryOptions}
          errors={errors.country}
          isMulti={false}
        />

        <InputForm
          type="text"
          name="state"
          label="State"
          placeholder="Enter State"
          controlId="formBasicState"
          register={register}
          errors={errors.state}
        />

        <InputForm
          type="text"
          name="city"
          label="City"
          placeholder="Enter City"
          controlId="formBasicCity"
          register={register}
          errors={errors.city}
        />

        <Row>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-bold">Job Image</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  {...register('img')}
                  onChange={fileChangedHandler}
                  className="form-control"
                />
                {loadedFile && (
                  <Button variant="primary" onClick={handleShow}>
                    Show
                  </Button>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <ImageModal
          show={show}
          handleClose={handleClose}
          offer={{
            title: getValues('title'),
            img: getValues('img'),
          }}
        />

        <div className="d-flex justify-content-between gap-1">
          <Button
            type="button"
            variant="primary"
            className="px-4"
            disabled={page === 0 && 'false'}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Button
            type="submit"
            variant="dark"
            className="px-4"
            disabled={uploading}
          >
            {uploading ? <SpinnerBorder size="sm" variant="light" /> : 'Save'}
          </Button>
        </div>
      </Form>
    </>
  )
}
