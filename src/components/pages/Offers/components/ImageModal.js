// Dependencies
import { Modal, Button } from 'react-bootstrap'

export const ImageModal = ({ show, handleClose, offer }) => {
  const { img } = offer
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Imagen Oferta de Trabajo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '300px',
          }}
        ></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
