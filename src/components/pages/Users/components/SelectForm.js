// Dependencies
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export const SelectForm = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label className="fw-bold">{props.label}</Form.Label>
      <Select
        className="mb-2 selectform"
        value={props.value}
        options={props.options}
        onChange={props.onChange}
      />
    </Form.Group>
  )
}
