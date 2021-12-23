// Dependencies
import { Form, InputGroup, FormControl } from 'react-bootstrap'

export const InputForm = ({
  type,
  register,
  errors,
  icon,
  label,
  name,
  validationRules,
}) => {
  return (
    <InputGroup className="mb-3">
      <span className="input-group-text">
        <i className={icon}></i>
      </span>
      <FormControl
        type={type}
        placeholder={label}
        autoComplete="off"
        {...register(name, { ...validationRules })}
      />
      {errors && (
        <Form.Text className="text-danger w-100">{errors.message}</Form.Text>
      )}
    </InputGroup>
  )
}
