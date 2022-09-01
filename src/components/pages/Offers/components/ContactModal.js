// Dependencies
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

// Custom Dependencies
import { LinkedinButton } from './LinkedinButton'
import { TwitterButton } from './TwitterButton'
import { InstagramButton } from './InstagramButton'
import { FacebookButton } from './FacebookButton'
import noImage from '../../../../assets/img/no-image2.png'

export const ContactModal = ({ show, handleClose, userProfile }) => {
  const {
    name,
    profession,
    education,
    email,
    linkedinUser,
    twitterUser,
    instagramUser,
    facebookUser,
    cvUrl,
  } = userProfile
  const { register, setValue } = useForm()

  useEffect(() => {
    setValue('name', name)
    setValue('profession', profession)
    setValue('education', education)
    setValue('email', email)
  }, [name, profession, education, email, setValue])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Información de Contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={3} xs={12} className="text-center text-xs-start">
            <Image
              src={noImage}
              roundedCircle
              fluid
              style={{ width: '8rem', height: 'auto' }}
            />
          </Col>
          <Col md={9} xs={12}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control {...register('name')} className="mb-3" disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <Form.Group controlId="formBasicProfession">
              <Form.Label>Profesión</Form.Label>
              <Form.Control
                {...register('profession')}
                className="mb-3"
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEducation">
              <Form.Label>Educación</Form.Label>
              <Form.Control
                {...register('education')}
                className="mb-3"
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register('email')} className="mb-3" disabled />
        </Form.Group>

        <Form.Group controlId="formBasicSocialNetworks">
          <Form.Label className="d-block">Redes Sociales</Form.Label>
          {linkedinUser || twitterUser || instagramUser || facebookUser ? (
            <div className="d-flex justify-content-start">
              <LinkedinButton user={linkedinUser} />
              <TwitterButton user={twitterUser} />
              <InstagramButton user={instagramUser} />
              <FacebookButton user={facebookUser} />
            </div>
          ) : (
            <Form.Control
              value="No tiene redes sociales registradas"
              className="mb-3"
              disabled
            />
          )}
        </Form.Group>

        <Form.Group controlId="formBasicCv">
          <Form.Label className="d-block mt-3">Curriculum Vitae</Form.Label>
          {cvUrl ? (
            <a
              href={cvUrl}
              className="btn btn-primary btn-sm"
              target="_blank"
              rel="noreferrer"
            >
              Mostrar / Descargar
            </a>
          ) : (
            <Form.Control
              value="No has registered resume"
              className="mb-3"
              disabled
            />
          )}
        </Form.Group>
      </Modal.Body>
    </Modal>
  )
}
