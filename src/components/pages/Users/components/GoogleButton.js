// Dependencies
import GoogleLogin from 'react-google-login'
import { Button } from 'react-bootstrap'

export const GoogleButton = ({ responseGoogle }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          type="button"
          variant="danger"
          className="w-100"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <i className="bi bi-google"></i> Login con Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
