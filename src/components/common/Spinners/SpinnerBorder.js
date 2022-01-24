// Dependencies
import { Spinner } from 'react-bootstrap'

export const SpinnerBorder = ({ size, variant }) => {
  return (
    <>
      <Spinner animation="border" role="status" size={size} variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  )
}
