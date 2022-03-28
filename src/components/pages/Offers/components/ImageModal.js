// Dependencies
import { Modal, Button } from 'react-bootstrap'

export const ImageModal = ({ show, handleClose, offer }) => {
  const { img } = offer
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Image Job Offer</Modal.Title>
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
