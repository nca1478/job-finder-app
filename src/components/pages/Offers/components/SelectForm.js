// Dependencies
import { Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export const SelectForm = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: true }}
      render={({ field }) => (
        <Form.Group className="mb-3" controlId={props.controlId}>
          <Form.Label className="fw-bold">{props.label}</Form.Label>
          <Select
            {...field}
            options={props.options}
            isClearable
            isMulti={props.isMulti}
          />
          {props.errors && (
            <Form.Text className="text-danger w-100">Requerido</Form.Text>
          )}
        </Form.Group>
      )}
    ></Controller>
  )
}
