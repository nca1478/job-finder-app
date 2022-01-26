// Dependencies
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'

// Custom Dependencies
import { LinkedinButton } from './LinkedinButton'
import { TwitterButton } from './TwitterButton'
import { InstagramButton } from './InstagramButton'
import { FacebookButton } from './FacebookButton'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile])

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register('name')} className="mb-3" disabled />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicProfession">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                {...register('profession')}
                className="mb-3"
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEducation">
              <Form.Label>Education</Form.Label>
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
          <Form.Label className="d-block">Social Networks</Form.Label>
          {linkedinUser || twitterUser || instagramUser || facebookUser ? (
            <div className="d-flex justify-content-start">
              <LinkedinButton user={linkedinUser} />
              <TwitterButton user={twitterUser} />
              <InstagramButton user={instagramUser} />
              <FacebookButton user={facebookUser} />
            </div>
          ) : (
            <Form.Control
              value="No has registered social networks"
              className="mb-3"
              disabled
            />
          )}
        </Form.Group>

        <Form.Group controlId="formBasicCv">
          <Form.Label className="d-block mt-3">Curriculum Vitae</Form.Label>
          {cvUrl ? (
            <a href={cvUrl} className="btn btn-primary btn-sm" target="_blank">
              Display / Download
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
