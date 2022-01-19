// Dependencies
import { Spinner } from 'react-bootstrap'

export const SpinnerBorder = () => {
  return (
    <>
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  )
}
