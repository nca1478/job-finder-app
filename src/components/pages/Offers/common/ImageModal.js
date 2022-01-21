// Dependencies
import { Modal, Button } from 'react-bootstrap'

export const ImageModal = ({ show, handleClose, offer }) => {
  const { title, img } = offer
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="img-thumbnail d-none d-md-block"
          src={img}
          // style={{ width: '170px', height: '100px' }}
          alt=""
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
