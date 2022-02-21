// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Card, Form, Button, Col } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'

// Custom Dependencies
import { get, put, file, post } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { PasswordModal } from './components/PasswordModal'
import { educationOptions } from '../../../data/selectOptions'
import { SpinnerBorder } from '../../common/Spinners/SpinnerBorder'
import { SpaceBlank } from '../../common/SpaceBlank/SpaceBlank'
import { InputForm } from './components/InputForm'
import { InputGroupPDF } from './components/InputGroupPDF'
import { SelectForm } from './components/SelectForm'
import { InputGroupDate } from './components/InputGroupDate'
import { InputFormSocial } from './components/InputFormSocial'

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

  const fetchUser = useCallback(
    async (id) => {
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
    },
    [reset, user]
  )

  useEffect(() => {
    fetchUser(user.data.id).catch(console.error)
  }, [fetchUser, user])

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
    const urlPDF = selectedFile
      ? await verifyFileUpload(user.data.id)
      : loadedPDF
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
              <SpaceBlank height="64vh" />
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
                        <InputForm
                          type="text"
                          name="name"
                          label="Name"
                          placeholder="Enter Name"
                          controlId="formBasicName"
                          register={register}
                          errors={errors.name}
                        />
                      </Col>

                      {/* Email */}
                      <Col md={12} lg={6}>
                        <InputForm
                          type="email"
                          name="email"
                          label="Email"
                          placeholder="Enter Email"
                          controlId="formBasicEmail"
                          register={register}
                          errors={errors.email}
                        />
                      </Col>
                    </Row>

                    <Row>
                      {/* Profession */}
                      <Col md={6} lg={6}>
                        <InputForm
                          type="text"
                          name="profession"
                          label="Profession"
                          placeholder="Enter Profession"
                          controlId="formBasicProfession"
                          register={register}
                          errors={errors.profession}
                        />
                      </Col>

                      {/* Education */}
                      <Col md={6} lg={3}>
                        <SelectForm
                          controlId="formBasicEducation"
                          label="Education"
                          value={educationSelect}
                          options={educationOptions}
                          onChange={handleEducationChange}
                        />
                      </Col>

                      {/* Birthday */}
                      <Col md={12} lg={3}>
                        <InputGroupDate
                          onChange={handleBirthdayDateChange}
                          value={dateBirthday}
                        />
                      </Col>
                    </Row>

                    {/* Curriculum Vitae (PDF) */}
                    <Row>
                      <Col>
                        <InputGroupPDF
                          register={register}
                          fileChangedHandler={fileChangedHandler}
                          loadedPDF={loadedPDF}
                        />
                      </Col>
                    </Row>

                    <Row>
                      {/* linkedinUser */}
                      <Col md={6} lg={3}>
                        <InputFormSocial
                          type="text"
                          name="linkedinUser"
                          controlId="formBasicLinkedinUser"
                          icon="bi bi-linkedin"
                          label="Linkedin"
                          placeholder="Enter linkedin user"
                          register={register}
                        />
                      </Col>

                      {/* twitterUser */}
                      <Col md={6} lg={3}>
                        <InputFormSocial
                          type="text"
                          name="twitterUser"
                          controlId="formBasicTwitterUser"
                          icon="bi bi-twitter"
                          label="Twitter"
                          placeholder="Enter twitter user"
                          register={register}
                        />
                      </Col>

                      {/* instagramUser */}
                      <Col md={6} lg={3}>
                        <InputFormSocial
                          type="text"
                          name="instagramUser"
                          controlId="formBasicInstagramUser"
                          icon="bi bi-instagram"
                          label="Instagram"
                          placeholder="Enter instagram user"
                          register={register}
                        />
                      </Col>

                      {/* facebookUser */}
                      <Col md={6} lg={3}>
                        <InputFormSocial
                          type="text"
                          name="facebookUser"
                          controlId="formBasicFacebookUser"
                          icon="bi bi-facebook"
                          label="Facebook"
                          placeholder="Enter facebook user"
                          register={register}
                        />
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
