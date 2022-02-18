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
        <img className="img-thumbnail d-none d-md-block" src={img} alt="" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
