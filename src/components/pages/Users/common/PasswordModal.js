// Dependencies
import { Modal, Form, Button } from 'react-bootstrap'

export const PasswordModal = ({ show, handleClose, register, onSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter your password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
