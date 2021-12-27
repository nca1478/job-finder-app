// Dependencies
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Button } from 'react-bootstrap'

export const Contactform = ({ show, handleClose, userProfile }) => {
  const { name, profession, email, cvText } = userProfile
  const { register, setValue } = useForm()

  useEffect(() => {
    setValue('name', name)
    setValue('profession', profession)
    setValue('email', email)
    setValue('cvText', cvText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register('name')} className="mb-3" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicProfession">
          <Form.Label>Profession</Form.Label>
          <Form.Control {...register('profession')} className="mb-3" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register('email')} className="mb-3" disabled />
        </Form.Group>
        <Form.Group controlId="formBasicCvtext">
          <Form.Label>CV Text</Form.Label>
          <Form.Control
            {...register('cvText')}
            className="mb-3"
            disabled
            as="textarea"
            rows={3}
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
