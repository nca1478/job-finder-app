import { Spinner } from 'react-bootstrap'
import { SpaceBlank } from '../SpaceBlank/SpaceBlank'

export const SpinnerBorder = () => {
  return (
    <>
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <SpaceBlank height="400px" />
    </>
  )
}
