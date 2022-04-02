// Dependencies
import { useCallback, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

// Custom Dependencies
import { getCountries } from '../../../../../config/api'
import { sortListByLabel } from '../../../../../helpers/utils'
import { parseDataCountries } from '../../helpers/parseData'
import { InputForm } from '../InputForm'
import { SelectForm } from '../SelectForm'

export const Step3 = (props) => {
  const { handleSave, formValues, setFormValues } = props
  const [countryOptions, setCountryOptions] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm()

  const fetchCountries = useCallback(async () => {
    await getCountries('https://api.countrystatecity.in/v1/countries').then(
      (data) => {
        const countries = parseDataCountries(data)
        sortListByLabel(countries)
        setCountryOptions(countries)
      }
    )
  }, [])

  const onSubmit = (data) => {
    if (data) {
      setFormValues({ ...formValues, ...data })
      handleSave(data)
    }
  }

  useEffect(() => {
    fetchCountries().catch(console.error)
    reset(formValues)
  }, [fetchCountries, formValues, reset])

  return (
    <div className="animate__animated animate__fadeIn">
      <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
        <SelectForm
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

        <div className="d-flex justify-content-between gap-1">
          <Button
            type="button"
            variant="primary"
            className="px-4"
            disabled={props.page === 0 && 'false'}
            onClick={props.handlePrev}
          >
            Prev
          </Button>
          <Button type="submit" variant="dark" className="px-4">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
