// Dependencies
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form } from 'react-bootstrap'

export const DescriptionModal = ({ show, handleClose, description }) => {
  const { register, setValue } = useForm()

  useEffect(() => {
    setValue('description', description)
  }, [setValue, description])

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles Oferta de Trabajo</Modal.Title>
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
    </Modal>
  )
}
