// Dependencies
import { Form } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker'

export const InputGroupDate = (props) => {
  return (
    <Form.Group className="mb-3" controlId="formBasicBirthday">
      <Form.Label className="fw-bold">Cumpleaños</Form.Label>
      <DateTimePicker
        className="form-control"
        onChange={props.onChange}
        value={props.value}
      />
    </Form.Group>
  )
}
