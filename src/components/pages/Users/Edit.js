// Dependencies
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Card, Form, Button, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select'
import moment from 'moment'

// Fetch Config
import { get, put } from '../../../config/api'

// Context
import { AuthContext } from '../../../auth/authContext'

// Modal
import { PasswordForm } from './common/PasswordForm'

// Select Options
import { educationOptions } from '../../../data/selectOptions'

// Components
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'

// Helpers
import { parseDataUser } from './helpers/parseDataUser'

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
      <Container className="p-4 bg-primary" style={{ width: '650px' }}>
        <h2 className="text-center text-white">User Profile</h2>
        <Row className="justify-content-center pt-2">
          <Col>
            {!loaded ? (
              <SpinnerBorder />
            ) : (
              <Card className="text-dark py-3">
                <Card.Body>
                  <Form className="mx-3" onSubmit={handleSubmit(handleShow)}>
                    {/* Name */}
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

                    {/* Email */}
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

                    {/* Profession */}
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicProfession"
                    >
                      <Form.Label className="fw-bold">Profession</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Profession"
                        {...register('profession')}
                      />
                    </Form.Group>

                    {/* Birthday */}
                    <Form.Group className="mb-3" controlId="formBasicBirthday">
                      <Form.Label className="fw-bold">Birthday</Form.Label>
                      <DateTimePicker
                        onChange={handleBirthdayDateChange}
                        value={dateBirthday}
                        className="form-control"
                      />
                    </Form.Group>

                    {/* Education */}
                    <Form.Group className="mb-3" controlId="formBasicEducation">
                      <Form.Label className="fw-bold">Education</Form.Label>
                      <Select
                        className="mb-2"
                        value={educationSelect}
                        options={educationOptions}
                        onChange={handleEducationChange}
                      />
                    </Form.Group>

                    {/* Curriculum Vitae */}
                    <Form.Group className="mb-3" controlId="formBasicCvText">
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
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
