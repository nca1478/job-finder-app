// Dependencies
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Card, Form, Button, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select'
import moment from 'moment'

// Custom Dependencies
import { get, put } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { PasswordForm } from './common/PasswordForm'
import { educationOptions } from '../../../data/selectOptions'
import { parseDataUser } from './helpers/parseDataUser'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'

export const EditUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    getValues,
  } = useForm()
  const { user } = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [dateBirthday, setDateBirthday] = useState(new Date())
  const [educationSelect, setEducationSelect] = useState(null)

  useEffect(() => {
    fetchUser(user.data.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUser = async (id) => {
    await get(`/users/${id}`, user.data.token)
      .then((response) => {
        reset(response.data)
        setDateBirthday(
          response.data.birthday
            ? moment(response.data.birthday).toDate()
            : new Date()
        )
        const item = educationOptions.find(
          (item) => item.label === response.data.education
        )
        setEducationSelect(item)
      })
      .catch((error) => {
        toast.error('Error try to fetching user.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const onSubmit = async () => {
    const dataUser = parseDataUser(
      formValues,
      getValues,
      dateBirthday,
      educationSelect
    )
    await put(`/users/${dataUser.id}/update`, dataUser, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Please verify the data entered and try again.')
        console.log(error)
      })
      .finally(() => {
        resetField('password')
        setShow(false)
      })
  }

  const handleClose = () => setShow(false)

  const handleShow = (data) => {
    setShow(true)
    setFormValues(data)
  }

  const handleBirthdayDateChange = (e) => {
    setDateBirthday(e)
  }

  const handleEducationChange = ({ value, label }) => {
    setEducationSelect({ value, label })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <h2 className="text-center text-white">User Profile</h2>
        <Row className="d-flex justify-content-center pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="400px" />
            </>
          ) : (
            <Col>
              <Card className="text-dark py-3">
                <Card.Body>
                  <Form className="mx-3" onSubmit={handleSubmit(handleShow)}>
                    <Row>
                      {/* Name */}
                      <Col md={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label className="fw-bold">Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            {...register('name', { required: true })}
                          />
                          {errors.name && (
                            <Form.Text className="text-danger w-100">
                              Name is required
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col md={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="fw-bold">Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            {...register('email', { required: true })}
                          />
                          {errors.email && (
                            <Form.Text className="text-danger w-100">
                              Email is required
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* Profession */}
                      <Col md={12} lg={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicProfession"
                        >
                          <Form.Label className="fw-bold">
                            Profession
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Profession"
                            {...register('profession')}
                          />
                        </Form.Group>
                      </Col>

                      {/* Education */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEducation"
                        >
                          <Form.Label className="fw-bold">Education</Form.Label>
                          <Select
                            className="mb-2"
                            value={educationSelect}
                            options={educationOptions}
                            onChange={handleEducationChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Birthday */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicBirthday"
                        >
                          <Form.Label className="fw-bold">Birthday</Form.Label>
                          <DateTimePicker
                            onChange={handleBirthdayDateChange}
                            value={dateBirthday}
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        {/* Curriculum Vitae */}
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCvText"
                        >
                          <Form.Label className="fw-bold">
                            Curriculum Vitae
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Text"
                            {...register('cvText')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      {/* linkedinUser */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicLinkedinUser"
                        >
                          <Form.Label className="fw-bold">
                            <i className="bi bi-linkedin"></i> Linkedin
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter linkedin user"
                            {...register('linkedinUser')}
                          />
                        </Form.Group>
                      </Col>

                      {/* twitterUser */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicTwitterUser"
                        >
                          <Form.Label className="fw-bold">
                            <i className="bi bi-twitter"></i> Twitter
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter twitter user"
                            {...register('twitterUser')}
                          />
                        </Form.Group>
                      </Col>

                      {/* instagramUser */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicInstagramUser"
                        >
                          <Form.Label className="fw-bold">
                            <i className="bi bi-instagram"></i> Instagram
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter instagram user"
                            {...register('instagramUser')}
                          />
                        </Form.Group>
                      </Col>

                      {/* facebookUser */}
                      <Col md={12} lg={3}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicFacebookUser"
                        >
                          <Form.Label className="fw-bold">
                            <i className="bi bi-facebook"></i> Facebook
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter facebook user"
                            {...register('facebookUser')}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Modal */}
                    <PasswordForm
                      show={show}
                      handleClose={handleClose}
                      register={register}
                      onSubmit={onSubmit}
                    />

                    {/* Save Button */}
                    <Button type="submit" variant="primary" className="w-100">
                      Save
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
