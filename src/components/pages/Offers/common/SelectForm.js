// Dependencies
import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export const SelectForm = ({
  name,
  label,
  controlId,
  control,
  options,
  errors,
  isMulti,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Form.Group className="mb-3" controlId={controlId}>
          <Form.Label>{label}</Form.Label>
          <Select {...field} options={options} isClearable isMulti={isMulti} />
          {errors && (
            <Form.Text className="text-danger w-100">Required</Form.Text>
          )}
        </Form.Group>
      )}
    ></Controller>
  )
}
