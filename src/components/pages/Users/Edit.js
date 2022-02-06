// Dependencies
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Row,
  Card,
  Form,
  Button,
  Col,
  InputGroup,
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select'
import moment from 'moment'

// Custom Dependencies
import { get, put, file, post } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { PasswordModal } from './common/PasswordModal'
import { educationOptions } from '../../../data/selectOptions'
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
  const [showPassModal, setShowPassModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [dateBirthday, setDateBirthday] = useState(new Date())
  const [educationSelect, setEducationSelect] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadedPDF, setLoadedPDF] = useState(null)
  const [uploading, setUploading] = useState(false)

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
        setLoadedPDF(response.data.cvUrl)
      })
      .catch((error) => {
        toast.error('Error try to fetching user.')
        console.log(error)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  const parseDataUser = async (data, urlPDF) => {
    return {
      ...data,
      birthday: moment(dateBirthday).format('YYYY-MM-DD'),
      education: educationSelect === undefined ? null : educationSelect.label,
      cvUrl: urlPDF,
    }
  }

  const uploadPDF = async (userId) => {
    const formData = new FormData()
    formData.append('pdf', selectedFile)
    setUploading(true)

    return new Promise(async function (resolve, reject) {
      await file('PUT', `/users/${userId}/uploadPdf`, formData, user.data.token)
        .then((response) => {
          if (response.data === null) {
            reject(response.errors.msg)
          } else {
            resolve(response.data.url)
          }
        })
        .catch((error) => {
          toast.error('Error uploading pdf.')
          console.log(error)
        })
    })
  }

  const verifyFileUpload = async (userId) => {
    return await uploadPDF(userId)
      .then((url) => {
        return { url }
      })
      .catch((err) => {
        return { err }
      })
  }

  const handleSave = async (data) => {
    const urlPDF = selectedFile ? await verifyFileUpload(user.data.id) : null

    if (urlPDF.err) {
      toast.error(urlPDF.err)
      setUploading(false)
    } else {
      const dataUser = await parseDataUser(data, urlPDF.url)
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
          setShowPassModal(false)
          setUploading(false)
        })
    }
  }

  const handleSend = async (data) => {
    const dataUser = {
      email: formValues.email,
      password: getValues('password'),
    }
    await post(`/users/verify`, dataUser, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          handleSave(data)
        }
      })
      .catch((error) => {
        toast.error('Please verify the data entered and try again.')
        console.log(error)
      })
      .finally(() => {
        resetField('password')
        setShowPassModal(false)
      })
  }

  const onSubmit = (data) => {
    if (data.facebook || data.google) {
      handleSave(data)
    } else {
      setShowPassModal(true)
      setFormValues(data)
    }
  }

  const handleClosePassModal = () => setShowPassModal(false)

  const handleBirthdayDateChange = (e) => {
    setDateBirthday(e)
  }

  const handleEducationChange = ({ value, label }) => {
    setEducationSelect({ value, label })
  }

  const fileChangedHandler = (e) => {
    setSelectedFile(e.target.files[0])
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="d-flex justify-content-center pt-2">
          {!loaded ? (
            <>
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="400px" />
            </>
          ) : (
            <Col>
              <Card className="text-dark">
                <Card.Header as="h5" className="text-center">
                  User Profile
                </Card.Header>
                <Card.Body>
                  <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
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
                      <Col md={6} lg={6}>
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
                      <Col md={6} lg={3}>
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

                    {/* Curriculum Vitae (PDF) */}
                    <Row>
                      <Col>
                        <InputGroup className="mb-3">
                          <Form.Label className="fw-bold w-100">
                            Curriculum Vitae (PDF)
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept=".pdf"
                            {...register('cvUrl')}
                            onChange={fileChangedHandler}
                          />
                          {loadedPDF && (
                            <a
                              href={loadedPDF}
                              className="btn btn-primary"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Display / Download
                            </a>
                          )}
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row>
                      {/* linkedinUser */}
                      <Col md={6} lg={3}>
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
                      <Col md={6} lg={3}>
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
                      <Col md={6} lg={3}>
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
                      <Col md={6} lg={3}>
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

                    {/* Modals */}
                    <PasswordModal
                      show={showPassModal}
                      handleClose={handleClosePassModal}
                      register={register}
                      handleSend={() => handleSend(formValues)}
                    />

                    {/* Save Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 mb-2"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <SpinnerBorder size="sm" variant="light" />
                      ) : (
                        'Save'
                      )}
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
