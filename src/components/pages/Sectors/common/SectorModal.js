// Dependencies
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Button } from 'react-bootstrap'

export const SectorModal = ({ show, onSubmit, handleClose, sector }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm()

  const setValues = useCallback(() => {
    if (sector) {
      setValue('id', sector.id)
      setValue('name', sector.name)
    } else {
      setValue('id', null)
      setValue('name', null)
    }
    clearErrors('name')
  }, [sector, clearErrors, setValue])

  useEffect(() => {
    setValues()
  }, [setValues])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{sector ? 'Edit Sector' : 'Add Sector'}</Modal.Title>
      </Modal.Header>
      <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <Form.Text className="text-danger w-100">Required</Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="dark">
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
