// Dependencies
import { Form } from 'react-bootstrap'

export const InputForm = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label className="fw-bold">{props.label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={props.placeholder}
        {...props.register(props.name, { required: true })}
      />
      {props.errors && (
        <Form.Text className="text-danger w-100">Required</Form.Text>
      )}
    </Form.Group>
  )
}
