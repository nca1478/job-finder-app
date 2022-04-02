// Dependencies
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  Container,
  Row,
  Card,
  Form,
  Button,
  Col,
  Tabs,
  Tab,
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
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
  const [showPassModal, setShowPassModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [dateBirthday, setDateBirthday] = useState(new Date())
  const [educationSelect, setEducationSelect] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadedPDF, setLoadedPDF] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [key, setKey] = useState('personal')

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

  const verifyFileUpload = async (data) => {
    return await uploadPDF(data.id)
      .then((url) => {
        return url
      })
      .catch((err) => {
        toast.error(err)
        return false
      })
  }

  const handleSave = async (data) => {
    const urlPDF = selectedFile ? await verifyFileUpload(data) : loadedPDF
    const dataUser = parseDataUser({
      ...data,
      dateBirthday,
      educationSelect,
      cvUrl: urlPDF,
    })

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
        <Row className="py-2">
          {!loaded ? (
            <div className="text-center">
              <SpinnerBorder size="lg" variant="light" />
              <SpaceBlank height="64vh" />
            </div>
          ) : (
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="text-dark">
                <Card.Header as="h5" className="text-center">
                  User Profile Info
                </Card.Header>
                <Form className="mx-3" onSubmit={handleSubmit(onSubmit)}>
                  <Card.Body>
                    <Tabs
                      id="controlled-tab-example"
                      transition={true}
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3"
                    >
                      <Tab eventKey="personal" title="Personal">
                        <InputForm
                          type="text"
                          name="name"
                          label="Name"
                          placeholder="Enter Name"
                          controlId="formBasicName"
                          register={register}
                          errors={errors.name}
                        />

                        <InputForm
                          type="email"
                          name="email"
                          label="Email"
                          placeholder="Enter Email"
                          controlId="formBasicEmail"
                          register={register}
                          errors={errors.email}
                        />

                        <InputGroupDate
                          onChange={handleBirthdayDateChange}
                          value={dateBirthday}
                        />
                      </Tab>

                      <Tab eventKey="job" title="Job">
                        <InputForm
                          type="text"
                          name="profession"
                          label="Profession"
                          placeholder="Enter Profession"
                          controlId="formBasicProfession"
                          register={register}
                          errors={errors.profession}
                        />

                        <SelectForm
                          controlId="formBasicEducation"
                          label="Education"
                          value={educationSelect}
                          options={educationOptions}
                          onChange={handleEducationChange}
                        />

                        <InputGroupPDF
                          register={register}
                          fileChangedHandler={fileChangedHandler}
                          loadedPDF={loadedPDF}
                        />
                      </Tab>

                      <Tab eventKey="social" title="Social">
                        <InputFormSocial
                          type="text"
                          name="linkedinUser"
                          controlId="formBasicLinkedinUser"
                          icon="bi bi-linkedin"
                          label="Linkedin"
                          placeholder="Enter linkedin user"
                          register={register}
                        />

                        <InputFormSocial
                          type="text"
                          name="twitterUser"
                          controlId="formBasicTwitterUser"
                          icon="bi bi-twitter"
                          label="Twitter"
                          placeholder="Enter twitter user"
                          register={register}
                        />

                        <InputFormSocial
                          type="text"
                          name="instagramUser"
                          controlId="formBasicInstagramUser"
                          icon="bi bi-instagram"
                          label="Instagram"
                          placeholder="Enter instagram user"
                          register={register}
                        />

                        <InputFormSocial
                          type="text"
                          name="facebookUser"
                          controlId="formBasicFacebookUser"
                          icon="bi bi-facebook"
                          label="Facebook"
                          placeholder="Enter facebook user"
                          register={register}
                        />
                      </Tab>
                    </Tabs>

                    <PasswordModal
                      show={showPassModal}
                      handleClose={handleClosePassModal}
                      register={register}
                      handleSend={() => handleSend(formValues)}
                    />

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
                  </Card.Body>
                </Form>
              </Card>
            </Col>
          )}
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
