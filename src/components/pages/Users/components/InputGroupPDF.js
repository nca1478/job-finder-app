// Dependencies
import { Form, InputGroup } from 'react-bootstrap'

export const InputGroupPDF = (props) => {
  return (
    <InputGroup className="mb-3">
      <Form.Label className="fw-bold w-100">Curriculum Vitae (PDF)</Form.Label>
      <Form.Control
        type="file"
        accept=".pdf"
        {...props.register('cvUrl')}
        onChange={props.fileChangedHandler}
      />
      {props.loadedPDF && (
        <a
          href={props.loadedPDF}
          className="btn btn-primary"
          target="_blank"
          rel="noreferrer"
        >
          Mostrar
        </a>
      )}
    </InputGroup>
  )
}
