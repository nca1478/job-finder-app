// Dependencies
import { useState, useContext } from 'react'
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

// Custom Dependencies
import { post } from '../../../config/api'
import { AuthContext } from '../../../auth/authContext'
import { parseDataOffer } from './helpers/parseData'
import { Step1 } from './components/AddSteps/Step1'
import { Step2 } from './components/AddSteps/Step2'
import { Step3 } from './components/AddSteps/Step3'

export const AddOfferPage = () => {
  const { user } = useContext(AuthContext)
  const [formValues, setFormValues] = useState({})
  const [page, setPage] = useState(0)
  const FormTitles = ['Basic Info', 'Skills & Price', 'Location Info']
  const ProgressBarNow = [33.3, 66.6, 100]

  const handlePrev = () => {
    setPage((currPage) => currPage - 1)
  }

  const handleNext = () => {
    if (page === FormTitles.length - 1) {
    } else {
      setPage((currPage) => currPage + 1)
    }
  }

  const handleSave = async (data) => {
    const dataOffer = parseDataOffer(data)
    post('/offers', dataOffer, user.data.token)
      .then((response) => {
        if (response.data === null) {
          toast.error(response.errors.msg)
        } else {
          toast.info(response.data.msg)
        }
      })
      .catch((error) => {
        toast.error('Error try to adding job offers.')
        console.log(error)
      })
      .finally(() => {
        // Reset form
        setFormValues({})
        setPage(0)
      })
  }

  return (
    <Col className="bg-primary">
      <Container className="p-4 bg-primary">
        <Row className="py-2">
          <Col md={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Header as="h5" className="text-center">
                Add Job Offer
              </Card.Header>
              <Card.Body>
                {/* Form Multistep */}
                <div className="px-3 pb-3">
                  <ProgressBar
                    now={ProgressBarNow[page]}
                    label={`${FormTitles[page]}`}
                    variant="dark"
                  />
                </div>

                {page === 0 && (
                  <Step1
                    page={page}
                    setPage={setPage}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    formValues={formValues}
                    setFormValues={setFormValues}
                  />
                )}

                {page === 1 && (
                  <Step2
                    page={page}
                    setPage={setPage}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    formValues={formValues}
                    setFormValues={setFormValues}
                  />
                )}

                {page === 2 && (
                  <Step3
                    page={page}
                    setPage={setPage}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    handleSave={handleSave}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Col>
  )
}
