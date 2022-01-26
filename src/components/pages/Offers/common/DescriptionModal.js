// Dependencies
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Button } from 'react-bootstrap'

export const DescriptionModal = ({ show, handleClose, description }) => {
  const { register, setValue } = useForm()

  useEffect(() => {
    setValue('description', description)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description])

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Job Offer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicCvtext">
          <Form.Control
            {...register('description')}
            className="mb-3"
            as="textarea"
            rows={10}
            disabled
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
