// Dependencies
import { Form } from 'react-bootstrap'

export const InputForm = ({
  name,
  label,
  placeholder,
  controlId,
  register,
  errors,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        {...register(name, { required: true })}
      />
      {errors && <Form.Text className="text-danger w-100">Required</Form.Text>}
    </Form.Group>
  )
}
