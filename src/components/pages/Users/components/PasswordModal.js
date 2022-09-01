// Dependencies
import { Modal, Form, Button } from 'react-bootstrap'

export const PasswordModal = ({ show, handleClose, register, handleSend }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ingresa tu contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register('password')}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSend}>
          Verificar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
