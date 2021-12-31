// Dependencies
import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export const SelectFormEdit = ({
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
      render={({ field: { onChange, value } }) => {
        return (
          <Form.Group className="mb-3" controlId={controlId}>
            <Form.Label className="fw-bold">{label}</Form.Label>
            <Select
              value={value}
              onChange={
                isMulti
                  ? (val) =>
                      onChange(
                        val.map((c) => ({
                          value: c.value,
                          label: c.label,
                          id: c.id,
                        }))
                      )
                  : (c) => onChange({ value: c.value, label: c.label })
              }
              options={options}
              isMulti={isMulti}
            />
            {errors && (
              <Form.Text className="text-danger w-100">Required</Form.Text>
            )}
          </Form.Group>
        )
      }}
    ></Controller>
  )
}
