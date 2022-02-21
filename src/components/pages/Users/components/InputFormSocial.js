// Dependencies
import { Form } from 'react-bootstrap'

export const InputFormSocial = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Label className="fw-bold">
        <i className={props.icon}></i> {props.label}
      </Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name)}
      />
    </Form.Group>
  )
}
