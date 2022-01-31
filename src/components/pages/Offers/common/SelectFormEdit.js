// Dependencies
import Select from 'react-select'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { parseData } from '../helpers/parseData'

export const SelectFormEdit = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        return (
          <Form.Group className="mb-3" controlId={props.controlId}>
            <Form.Label className="fw-bold">{props.label}</Form.Label>
            <Select
              value={value}
              onChange={
                props.isMulti
                  ? (val) => onChange(val)
                  : (c) => onChange({ value: c.value, label: c.label })
              }
              options={props.options}
              isMulti={props.isMulti}
            />
            {props.errors && (
              <Form.Text className="text-danger w-100">Required</Form.Text>
            )}
          </Form.Group>
        )
      }}
    ></Controller>
  )
}
